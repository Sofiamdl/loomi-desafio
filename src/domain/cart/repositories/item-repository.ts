import { Item, ItemWithOrderProduct } from '../entities/item.entity';
import { IUpdateItemData } from '../use-cases/update-item-use-case';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
  // abstract findAll(): Promise<[User]>;
  abstract findById(id: string): Promise<ItemWithOrderProduct>;
  abstract update(id: string, data: IUpdateItemData): Promise<Item>;
  abstract delete(id: string): Promise<void>;
}
