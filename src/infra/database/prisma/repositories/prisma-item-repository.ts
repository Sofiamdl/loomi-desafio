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
