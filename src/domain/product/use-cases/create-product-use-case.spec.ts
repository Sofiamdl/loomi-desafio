import { describe, expect, it, vi } from 'vitest';
import { AsMock } from 'src/core/logic/AsMock';
import {
  CreateProductUseCase,
  CreateProductUseCaseRequest,
} from './create-product-use-case';
import { ProductRepository } from '../repositories/product-repository';

describe('should successfully create product ', () => {
  it('should create a new product with the given name, description, price, and quantity', async () => {
    const request: CreateProductUseCaseRequest = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 5,
    };

    const repositoryMock = {
      create: vi.fn().mockResolvedValue({
        name: request.name,
        description: request.description,
        price: request.price,
        quantity: request.quantity,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    };

    const useCase = new CreateProductUseCase(
      AsMock<ProductRepository>(repositoryMock),
    );

    await useCase.execute(request);

    expect(repositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: request.name,
        description: request.description,
        price: request.price,
        quantity: request.quantity,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
  });
});
