import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';
import { Order } from 'src/domain/order/entities/order.entity';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
