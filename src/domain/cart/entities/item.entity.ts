import { randomUUID } from 'node:crypto';

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
