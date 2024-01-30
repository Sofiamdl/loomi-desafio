import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/product-repository';

export interface UpdateUseCaseRequest {
  id: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
}

export interface UpdateUseCaseResponse {
  product: Product;
}

@Injectable()
export class UpdateProductUseCase
  implements UseCase<UpdateUseCaseRequest, UpdateUseCaseResponse>
{
  constructor(private repository: ProductRepository) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, description, name, price, quantity } = request;
    const isUserAdmin = await this.repository.findById(id);

    if (!isUserAdmin) throw new NotFoundException();

    const data = {
      name,
      price,
      description,
      quantity,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key],
    );

    const product = await this.repository.update(id, data);

    return { product };
  }
}
