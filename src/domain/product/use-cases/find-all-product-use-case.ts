import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/product-repository';

export interface FindAllProductUseCaseRequest {
  page: number;
  pageAmount: number;
  description: string;
  name: string;
  isAvailable: boolean;
  maxPrice: number;
  minPrice: number;
}

export interface FindAllProductUseCaseResponse {
  products: Product[];
}

@Injectable()
export class FindAllProductUseCase
  implements
    UseCase<FindAllProductUseCaseRequest, FindAllProductUseCaseResponse>
{
  constructor(private productRepository: ProductRepository) {}

  async execute(
    query: FindAllProductUseCaseRequest,
  ): Promise<FindAllProductUseCaseResponse> {
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key],
    );
    const products = await this.productRepository.findAll(query);
    return { products };
  }
}
