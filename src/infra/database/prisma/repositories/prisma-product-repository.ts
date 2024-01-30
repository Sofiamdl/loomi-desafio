import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IFindAllProductRepository,
  ProductRepository,
} from 'src/domain/product/repositories/product-repository';
import { Product } from 'src/domain/product/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(query: IFindAllProductRepository): Promise<[Product]> {
    const products = (await this.prismaService.product.findMany({
      where: {
        AND: [
          query.minPrice != undefined &&
            query.maxPrice != undefined && {
              price: {
                gte: query.minPrice,
                lte: query.maxPrice,
              },
            },
          query.name != undefined && {
            name: {
              contains: query.name,
              mode: 'insensitive',
            },
          },
          query.description != undefined && {
            description: {
              contains: query.description,
              mode: 'insensitive',
            },
          },
          query.isAvailable != undefined &&
            (query.isAvailable
              ? {
                  quantity: { not: 0 },
                }
              : {
                  quantity: 0,
                }),
        ],
      },
      take: query.pageAmount,
      skip: (query.page - 1) * query.pageAmount,
    })) as [Product];
    return products;
  }
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
