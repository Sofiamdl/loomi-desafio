import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order-repository';
import { UseCase } from 'src/core/use-case';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';
import { OrderStatus } from '@prisma/client';

export interface WebhookUseCaseRequest {
  event: any;
}

export interface WebhookUseCaseResponse {
  paymentIntent: string;
}

@Injectable()
export class WebhookUseCase
  implements UseCase<WebhookUseCaseRequest, WebhookUseCaseResponse>
{
  constructor(
    private orderRepository: OrderRepository,
    private itemRepository: ItemRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(
    request: WebhookUseCaseRequest,
  ): Promise<WebhookUseCaseResponse> {
    const { event } = request;

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent);
        const order = await this.orderRepository.findByPaymentIndent(
          String(paymentIntent.id),
        );
        await this.orderRepository.update(order.id, {
          status: OrderStatus.PREPARING,
        });
        break;
      case 'payment_intent.payment_failed':
        const paymentFailedIntent = event.data.object;
        console.log('PaymentIntent payment failed:', paymentFailedIntent);
        const orderFound = await this.orderRepository.findByPaymentIndent(
          String(paymentIntent.id),
        );
        await this.orderRepository.update(orderFound.id, {
          status: OrderStatus.INVALID,
        });

        const allItems = await this.itemRepository.findAll(orderFound.id);

        for (const item of allItems) {
          await this.productRepository.update(item.productId, {
            quantity: item.product.quantity + item.quantity,
          });
        }

        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }
    return { paymentIntent: '' };
  }
}
