import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderUseCase } from 'src/domain/order/use-cases/create-order-use-case';
import { DeleteOrderController } from './delete-order.controller';
import { DeleteOrderUseCase } from 'src/domain/order/use-cases/delete-order-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    DeleteOrderController,
    // FindAllProductController,
    // FindProductController,
    // UpdateProductController,
  ],
  providers: [
    DeleteOrderUseCase,
    // FindAllProductUseCase,
    // FindProductUseCase,
    // UpdateProductUseCase,
    CreateOrderUseCase,
  ],
})
export class OrderModule {}
