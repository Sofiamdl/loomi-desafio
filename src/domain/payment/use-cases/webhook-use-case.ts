import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order-repository';
import { PaymentGateway } from 'src/domain/payment/gateway/payment-gateway';
import { UseCase } from 'src/core/use-case';
import { OrderStatus } from '@prisma/client';

export interface WebhookUseCaseRequest {
  event: any;
}

export interface WebhookUseCaseResponse {
  clientSecret: string;
}

@Injectable()
export class WebhookUseCase
  implements UseCase<WebhookUseCaseRequest, WebhookUseCaseResponse>
{
  constructor(
    private orderRepository: OrderRepository,
    private paymentGateway: PaymentGateway,
  ) {}

  async execute(
    request: WebhookUseCaseRequest,
  ): Promise<WebhookUseCaseResponse> {
    const { event } = request;
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        const paymentFailedIntent = event.data.object;
        console.log('PaymentIntent payment failed:', paymentFailedIntent);
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }
  }
}
