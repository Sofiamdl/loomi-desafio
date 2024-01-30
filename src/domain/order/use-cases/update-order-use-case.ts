import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { OrderStatus } from '@prisma/client';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order-repository';

export interface UpdateUseCaseRequest {
  id: string;
  status: OrderStatus;
}

export interface UpdateUseCaseResponse {
  order: Order;
}

@Injectable()
export class UpdateOrderUseCase
  implements UseCase<UpdateUseCaseRequest, UpdateUseCaseResponse>
{
  constructor(private repository: OrderRepository) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, status } = request;
    const orderExists = await this.repository.findById(id);

    if (!orderExists) throw new NotFoundException();

    const data = {
      status,
    };

    const order = await this.repository.update(id, data);

    return { order };
  }
}
