import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import { Item, ItemWithOrder } from 'src/domain/cart/entities/item.entity';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<ItemWithOrder> {
    const item = await this.prismaService.item.findUnique({
      where: { id },
      include: {
        order: true,
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
