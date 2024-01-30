import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProductController } from './create-product.controller';
import { CreateProductUseCase } from 'src/domain/product/use-cases/create-product-use-case';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductUseCase } from 'src/domain/product/use-cases/delete-product-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    DeleteProductController,
    // FindAllUserController,
    // FindUserController,
    // UpdateUserController,
  ],
  providers: [
    DeleteProductUseCase,
    // FindAdminsUseCase,
    // FindAdminUseCase,
    // UpdateAdminUseCase,
    CreateProductUseCase,
  ],
})
export class ProductModule {}
