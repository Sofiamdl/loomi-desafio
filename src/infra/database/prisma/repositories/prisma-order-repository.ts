import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';
import { Order } from 'src/domain/order/entities/order.entity';
import { IQueryFindAllOrder } from 'src/domain/order/use-cases/find-all-order-use-case';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query: IQueryFindAllOrder): Promise<[Order]> {
    const products = (await this.prismaService.order.findMany({
      where: {
        AND: [
          {
            total: {
              gte: query.minPrice,
              lte: query.maxPrice,
            },
          },
          {
            created_at: {
              gte: query.fromDate,
              lte: query.toDate,
            },
          },
          {
            status: query.status,
          },
          {
            clientId: query.clientId,
          },
        ],
      },
      take: Number(query.pageAmount),
      skip: (query.page - 1) * query.pageAmount,
    })) as [Order];
    return products;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    return order;
  }
  async delete(id: string): Promise<void> {
    await this.prismaService.order.delete({ where: { id } });
    return;
  }

  async create(order: Order): Promise<Order> {
    const orderCreated = await this.prismaService.order.create({ data: order });
    return orderCreated;
  }
}
