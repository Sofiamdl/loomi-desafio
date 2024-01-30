import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderUseCase } from 'src/domain/order/create-order-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    // DeleteProductController,
    // FindAllProductController,
    // FindProductController,
    // UpdateProductController,
  ],
  providers: [
    // DeleteProductUseCase,
    // FindAllProductUseCase,
    // FindProductUseCase,
    // UpdateProductUseCase,
    CreateOrderUseCase,
  ],
})
export class OrderModule {}
