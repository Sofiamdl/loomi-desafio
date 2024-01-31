import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product-repository';

export interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CreateProductUseCaseResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase
  implements UseCase<CreateProductUseCaseRequest, CreateProductUseCaseResponse>
{
  constructor(private repository: ProductRepository) {}

  async execute(
    request: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const { name, description, price, quantity } = request;

    const product = new Product({
      name,
      description,
      price,
      quantity,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.repository.create(product);
    return { product };
  }
}
