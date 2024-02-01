import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { Product } from '@prisma/client';
import {
  IFindAllProductRepository,
  ProductRepository,
} from '../repositories/product-repository';

export interface FindAllProductUseCaseRequest {
  page: number;
  pageAmount: number;
  description: string;
  name: string;
  isAvailable: Availability | boolean;
  maxPrice: number;
  minPrice: number;
}

export interface FindAllProductUseCaseResponse {
  products: Product[];
}

export type Availability = { not: number } | number;

@Injectable()
export class FindAllProductUseCase
  implements
    UseCase<FindAllProductUseCaseRequest, FindAllProductUseCaseResponse>
{
  constructor(private productRepository: ProductRepository) {}

  async execute(
    query: FindAllProductUseCaseRequest,
  ): Promise<FindAllProductUseCaseResponse> {
    if (query.isAvailable != undefined) {
      if (Boolean(query.isAvailable) == true) query.isAvailable = { not: 0 };
      else query.isAvailable = 0;
    }

    if (query.maxPrice != undefined) query.maxPrice = Number(query.maxPrice);
    if (query.minPrice != undefined) query.minPrice = Number(query.minPrice);

    const products = await this.productRepository.findAll(
      query as IFindAllProductRepository,
    );
    return { products };
  }
}
