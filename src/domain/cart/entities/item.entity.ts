import { randomUUID } from 'node:crypto';
import { Order } from 'src/domain/order/entities/order.entity';

export class Item {
  public readonly id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unityPrice: number;
  subtotal: number;

  constructor(props: Omit<Item, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}

export class ItemWithOrder {
  public readonly id: string;
  orderId: string;
  order: Order;
  productId: string;
  quantity: number;
  unityPrice: number;
  subtotal: number;

  constructor(props: Omit<Item, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
