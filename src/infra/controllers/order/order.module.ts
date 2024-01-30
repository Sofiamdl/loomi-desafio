import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderUseCase } from 'src/domain/order/use-cases/create-order-use-case';
import { DeleteOrderController } from './delete-order.controller';
import { DeleteOrderUseCase } from 'src/domain/order/use-cases/delete-order-use-case';
import { FindOrderController } from './find-order.controller';
import { FindOrderUseCase } from 'src/domain/order/use-cases/find-order-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    DeleteOrderController,
    // FindAllProductController,
    FindOrderController,
    // UpdateProductController,
  ],
  providers: [
    DeleteOrderUseCase,
    // FindAllProductUseCase,
    FindOrderUseCase,
    // UpdateProductUseCase,
    CreateOrderUseCase,
  ],
})
export class OrderModule {}
