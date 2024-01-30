import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  // abstract findAll(): Promise<[Account]>;
  abstract findById(id: string): Promise<Product>;
  abstract update(
    id: string,
    data: {
      description?: string;
      name?: string;
      price?: number;
      quantity?: number;
    },
  ): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
