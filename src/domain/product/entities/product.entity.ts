import { randomUUID } from 'node:crypto';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class Product {
  public readonly id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  // items: {
  //   dataType: Item[];
  // };

  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
