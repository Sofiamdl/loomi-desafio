import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order-repository';
import { PaymentGateway } from 'src/domain/payment/gateway/payment-gateway';
import { UseCase } from 'src/core/use-case';
import { OrderStatus } from '@prisma/client';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';

export interface CreateIntentUseCaseRequest {
  orderId: string;
}

export interface CreateIntentUseCaseResponse {
  paymentIntent: string;
}

@Injectable()
export class CreateIntentUseCase
  implements UseCase<CreateIntentUseCaseRequest, CreateIntentUseCaseResponse>
{
  constructor(
    private orderRepository: OrderRepository,
    private itemRepository: ItemRepository,
    private paymentGateway: PaymentGateway,
    private productRepository: ProductRepository,
  ) {}

  async execute(
    request: CreateIntentUseCaseRequest,
  ): Promise<CreateIntentUseCaseResponse> {
    const { orderId } = request;

    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order Not Found');

    const paymentIntent = await this.paymentGateway.createPaymentIntent(
      order.total,
    );

    const allItems = await this.itemRepository.findAll(orderId);

    for (const item of allItems) {
      await this.productRepository.update(item.productId, {
        quantity: item.product.quantity - item.quantity,
      });
    }

    await this.orderRepository.update(orderId, {
      status: OrderStatus.CLOSED,
      payment_intent: paymentIntent.id,
    });

    return { paymentIntent: paymentIntent.id };
  }
}
