import { describe, expect, it, vi } from 'vitest';

import { OrderStatus } from '@prisma/client';
import { AsMock } from 'src/core/logic/AsMock';

import {
  AddToCartUseCase,
  AddToCartUseCaseRequest,
} from './add-to-cart-use-case';
import { ItemRepository } from '../repositories/item-repository';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';

describe('should successfully confirm code for registered user', () => {
  it('should add a new item to the cart when valid input is provided', async () => {
    // Arrange
    const request: AddToCartUseCaseRequest = {
      productId: 'product-id',
      orderId: 'order-id',
      quantity: 2,
    };

    const order = {
      id: 'order-id',
      clientId: 'client-id',
      status: OrderStatus.OPENED,
      total: 100,
      created_at: new Date(),
      updated_at: new Date(),
      payment_intent: undefined,
    };

    const productRepositoryMock = {
      findById: vi.fn().mockResolvedValue({
        id: request.productId,
        name: 'produto',
        description: 'produto',
        price: 10,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    };

    const orderRepositoryMock = {
      findById: vi.fn().mockResolvedValue(order),
      update: vi.fn().mockResolvedValue(order),
    };

    const item = {
      id: 'any',
      orderId: request.orderId,
      productId: request.productId,
      quantity: 2,
      unityPrice: 1,
      subtotal: 2,
    };

    const itemRepositoryMock = {
      findOneBy: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue(item),
      findSum: vi.fn().mockResolvedValue(10),
    };

    const useCase = new AddToCartUseCase(
      AsMock<ProductRepository>(productRepositoryMock),
      AsMock<OrderRepository>(orderRepositoryMock),
      AsMock<ItemRepository>(itemRepositoryMock),
    );

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(productRepositoryMock.findById).toHaveBeenCalled();
    expect(orderRepositoryMock.findById).toHaveBeenCalled();
    expect(itemRepositoryMock.findOneBy).toHaveBeenCalled();
    expect(itemRepositoryMock.create).toHaveBeenCalled();
    expect(orderRepositoryMock.update).toHaveBeenCalled();
    expect(result.item).toEqual({
      id: 'any',
      orderId: 'order-id',
      productId: 'product-id',
      quantity: 2,
      subtotal: 2,
      unityPrice: 1,
    });
  });
});
