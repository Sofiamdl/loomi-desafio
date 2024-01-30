import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';
import { Order } from 'src/domain/order/entities/order.entity';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const orderCreated = await this.prismaService.order.create({ data: order });
    return orderCreated;
  }
}
