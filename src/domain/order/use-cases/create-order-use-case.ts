import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { Order } from '../entities/order.entity';
import { UseCase } from 'src/core/use-case';
import { OrderRepository } from '../repositories/order-repository';

export interface CreateOrderUseCaseRequest {
  id: string;
}

export interface CreateOrderUseCaseResponse {
  order: Order;
}

@Injectable()
export class CreateOrderUseCase
  implements UseCase<CreateOrderUseCaseRequest, CreateOrderUseCaseResponse>
{
  constructor(private repository: OrderRepository) {}

  async execute(
    request: CreateOrderUseCaseRequest,
  ): Promise<CreateOrderUseCaseResponse> {
    const { id } = request;

    const order = new Order({
      clientId: id,
      total: 0,
      status: OrderStatus.OPENED,
      created_at: new Date(),
      updated_at: new Date(),
      payment_intent: undefined,
    });

    await this.repository.create(order);
    return { order };
  }
}
