import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';
import { Product } from 'src/domain/product/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async update(
    id: string,
    data: {
      description?: string;
      name?: string;
      price?: number;
      quantity?: number;
    },
  ): Promise<Product> {
    const product = await this.prismaService.product.update({
      where: { id },
      data,
    });
    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    return product;
  }
  async delete(id: string): Promise<void> {
    await this.prismaService.product.delete({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    const productCreated = await this.prismaService.product.create({
      data: product,
    });
    return productCreated;
  }
}
