import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  // abstract findAll(): Promise<[Account]>;
  // abstract findById(id: string): Promise<Account>;
  // abstract update(
  //   id: string,
  //   data: {
  //     name?: string;
  //     contact?: string;
  //     address?: string;
  //   },
  // ): Promise<Account>;
  // abstract delete(id: string): Promise<void>;
}
