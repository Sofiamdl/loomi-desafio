import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { ProductRepository } from '../repositories/product-repository';
import { Product } from '@prisma/client';

export interface FindProductUseCaseCaseRequest {
  id: string;
}

export interface FindProductUseCaseCaseResponse {
  product: Product;
}

@Injectable()
export class FindProductUseCase
  implements
    UseCase<FindProductUseCaseCaseRequest, FindProductUseCaseCaseResponse>
{
  constructor(private repository: ProductRepository) {}

  async execute(
    request: FindProductUseCaseCaseRequest,
  ): Promise<FindProductUseCaseCaseResponse> {
    const { id } = request;

    const product = await this.repository.findById(id);

    return { product };
  }
}
