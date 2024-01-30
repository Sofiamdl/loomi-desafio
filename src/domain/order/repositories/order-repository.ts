import { Order } from '../entities/order.entity';
import { IQueryFindAllOrder } from '../use-cases/find-all-order-use-case';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(query: IQueryFindAllOrder): Promise<[Order]>;
  abstract findById(id: string): Promise<Order>;
  // abstract update(
  //   id: string,
  //   data: {
  //     name?: string;
  //     contact?: string;
  //     address?: string;
  //   },
  // ): Promise<Account>;
  abstract delete(id: string): Promise<void>;
}
