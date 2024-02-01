import { describe, expect, it, vi } from 'vitest';
import { OrderStatus } from '@prisma/client';
import { AsMock } from 'src/core/logic/AsMock';

import {
  CreateOrderUseCase,
  CreateOrderUseCaseRequest,
} from './create-order-use-case';
import { OrderRepository } from '../repositories/order-repository';

describe('should successfully confirm code for registered user', () => {
  it('should create a new Order with the given clientId, total, status, created_at, updated_at, and payment_intent, and save it to the repository', async () => {
    const request: CreateOrderUseCaseRequest = {
      id: 'validClientId',
    };

    const orderRepositoryMock = {
      create: vi.fn().mockResolvedValue({
        clientId: request.id,
        total: 0,
        status: OrderStatus.OPENED,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        payment_intent: undefined,
      }),
    };

    const useCase = new CreateOrderUseCase(
      AsMock<OrderRepository>(orderRepositoryMock),
    );

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(orderRepositoryMock.create).toHaveBeenCalled();
    expect(result.order).toEqual({
      clientId: request.id,
      total: 0,
      status: OrderStatus.OPENED,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      payment_intent: undefined,
      id: expect.any(String),
    });
  });
});
