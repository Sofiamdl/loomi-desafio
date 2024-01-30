import { OrderStatus } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class Order {
  public readonly id: string;
  clientId: string;
  status: OrderStatus;
  total: number;
  created_at: Date;
  updated_at: Date;
  // itens: {
  //   dataType: Item[];
  // };

  constructor(props: Omit<Order, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
