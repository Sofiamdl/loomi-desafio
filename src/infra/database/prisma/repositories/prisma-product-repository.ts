import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';
import { Product } from 'src/domain/product/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const productCreated = await this.prismaService.product.create({
      data: product,
    });
    return productCreated;
  }
}
