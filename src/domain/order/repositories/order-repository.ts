import { OrderStatus } from '@prisma/client';
import { Order } from '../entities/order.entity';
import { IQueryFindAllOrder } from '../use-cases/find-all-order-use-case';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(query: IQueryFindAllOrder): Promise<[Order]>;
  abstract findById(id: string): Promise<Order>;
  abstract findByPaymentIndent(id: string): Promise<Order>;

  abstract update(
    id: string,
    data: {
      status?: OrderStatus;
      payment_intent?: string;
      total?: number;
    },
  ): Promise<Order>;
  abstract delete(id: string): Promise<void>;
}
