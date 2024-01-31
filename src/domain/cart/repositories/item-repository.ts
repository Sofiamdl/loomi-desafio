import { Item, ItemWithOrder } from '../entities/item.entity';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
  // abstract findAll(): Promise<[User]>;
  abstract findById(id: string): Promise<ItemWithOrder>;
  // abstract update(data: { name: string; id: string }): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
