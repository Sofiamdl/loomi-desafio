import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProductController } from './create-product.controller';
import { CreateProductUseCase } from 'src/domain/product/use-cases/create-product-use-case';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductUseCase } from 'src/domain/product/use-cases/delete-product-use-case';
import { FindProductController } from './find-product.controller';
import { FindProductUseCase } from 'src/domain/product/use-cases/find-product-use-case';
import { UpdateProductController } from './update-product.controller';
import { UpdateProductUseCase } from 'src/domain/product/use-cases/update-product-use-case';
import { FindAllProductController } from './find-all-product.controller';
import { FindAllProductUseCase } from 'src/domain/product/use-cases/find-all-product-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    DeleteProductController,
    FindAllProductController,
    FindProductController,
    UpdateProductController,
  ],
  providers: [
    DeleteProductUseCase,
    FindAllProductUseCase,
    FindProductUseCase,
    UpdateProductUseCase,
    CreateProductUseCase,
  ],
})
export class ProductModule {}
