import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { Item } from '../entities/item.entity';
import { ProductRepository } from '../../product/repositories/product-repository';
import { OrderRepository } from '../../order/repositories/order-repository';
import { UseCase } from 'src/core/use-case';
import { ItemRepository } from '../repositories/item-repository';

export interface AddToCartUseCaseRequest {
  productId: string;
  orderId: string;
  quantity: number;
}

export interface AddToCartUseCaseResponse {
  item: Item;
}

@Injectable()
export class AddToCartUseCase
  implements UseCase<AddToCartUseCaseRequest, AddToCartUseCaseResponse>
{
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private itemRepository: ItemRepository,
  ) {}

  async execute(
    request: AddToCartUseCaseRequest,
  ): Promise<AddToCartUseCaseResponse> {
    const { productId, orderId, quantity } = request;

    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundException('Product Not Found');
    if (product.quantity == 0)
      throw new BadRequestException('Product Not Available');

    const order = await this.orderRepository.findById(orderId);

    if (!order) throw new NotFoundException('Order Not Found');
    if (order.status != OrderStatus.OPENED)
      throw new BadRequestException('You Cant Update That Order');

    const item = new Item({
      productId,
      orderId,
      quantity,
      unityPrice: product.price,
      subtotal: product.price * quantity,
    });

    const itemCreated = await this.itemRepository.create(item);
    const total = await this.itemRepository.findSum(orderId);
    await this.orderRepository.update(orderId, { total });
    return { item: itemCreated };
  }
}
