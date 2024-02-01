import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import {
  Item,
  ItemWithOrderProduct,
} from 'src/domain/cart/entities/item.entity';
import { IUpdateItemData } from 'src/domain/cart/use-cases/update-item-use-case';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneBy(
    orderId: string,
    productId: string,
  ): Promise<ItemWithOrderProduct> {
    const item = await this.prismaService.item.findFirst({
      where: { orderId, productId },
      include: {
        order: true,
        product: true,
      },
    });
    return item;
  }
  async findAll(orderId: string): Promise<[ItemWithOrderProduct]> {
    const items = await this.prismaService.item.findMany({
      where: { orderId },
      include: {
        order: true,
        product: true,
      },
    });
    return items as [ItemWithOrderProduct];
  }

  async findSum(id: string): Promise<number> {
    const aggregations = await this.prismaService.item.aggregate({
      _sum: {
        subtotal: true,
      },
      where: {
        orderId: id,
      },
    });
    return aggregations._sum.subtotal;
  }

  async update(id: string, data: IUpdateItemData): Promise<Item> {
    const item = await this.prismaService.item.update({
      where: { id },
      data,
    });
    return item;
  }

  async findById(id: string): Promise<ItemWithOrderProduct> {
    const item = await this.prismaService.item.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.item.delete({ where: { id } });
    return;
  }

  async create(item: Item): Promise<Item> {
    const itemCreated = await this.prismaService.item.create({ data: item });
    return itemCreated;
  }
}
