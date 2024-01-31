import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import { Item } from 'src/domain/cart/entities/item.entity';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(item: Item): Promise<Item> {
    const itemCreated = await this.prismaService.item.create({ data: item });
    return itemCreated;
  }
}
