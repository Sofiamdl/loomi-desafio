import { Product } from '../entities/product.entity';
import { Availability } from '../use-cases/find-all-product-use-case';

export interface IFindAllProductRepository {
  page?: number;
  pageAmount?: number;
  description?: string;
  name?: string;
  isAvailable?: Availability;
  maxPrice?: number;
  minPrice?: number;
}

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findAll(data: IFindAllProductRepository): Promise<[Product]>;
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
