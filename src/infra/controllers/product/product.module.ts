import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateProductController } from './create-product.controller';
import { CreateProductUseCase } from 'src/domain/product/use-cases/create-product-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    // DeleteAdminController,
    // FindAllUserController,
    // FindUserController,
    // UpdateUserController,
  ],
  providers: [
    // DeleteAdminUseCase,
    // FindAdminsUseCase,
    // FindAdminUseCase,
    // UpdateAdminUseCase,
    CreateProductUseCase,
  ],
})
export class ProductModule {}
