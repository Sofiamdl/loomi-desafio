import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order-repository';
import { PaymentGateway } from 'src/domain/payment/gateway/payment-gateway';
import { UseCase } from 'src/core/use-case';
import { OrderStatus } from '@prisma/client';

export interface CreateIntentUseCaseRequest {
  orderId: string;
}

export interface CreateIntentUseCaseResponse {
  clientSecret: string;
}

@Injectable()
export class CreateIntentUseCase
  implements UseCase<CreateIntentUseCaseRequest, CreateIntentUseCaseResponse>
{
  constructor(
    private orderRepository: OrderRepository,
    private paymentGateway: PaymentGateway,
  ) {}

  async execute(
    request: CreateIntentUseCaseRequest,
  ): Promise<CreateIntentUseCaseResponse> {
    const { orderId } = request;

    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order Not Found');
    await this.orderRepository.update(orderId, { status: OrderStatus.CLOSED });

    const paymentIntent = await this.paymentGateway.createPaymentIntent(
      order.total,
    );
    return { clientSecret: paymentIntent.client_secret };
  }
}
