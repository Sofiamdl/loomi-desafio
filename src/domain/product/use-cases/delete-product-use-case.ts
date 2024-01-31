import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { ProductRepository } from '../repositories/product-repository';

export interface DeleteProductUseCaseRequest {
  id: string;
}

export interface DeleteProductUseCaseResponse {}

@Injectable()
export class DeleteProductUseCase
  implements UseCase<DeleteProductUseCaseRequest, DeleteProductUseCaseResponse>
{
  constructor(private repository: ProductRepository) {}

  async execute(
    request: DeleteProductUseCaseRequest,
  ): Promise<DeleteProductUseCaseResponse> {
    const { id } = request;

    await this.repository.delete(id);

    return;
  }
}
