import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateOrderController } from './create-order.controller';
import { CreateOrderUseCase } from 'src/domain/order/use-cases/create-order-use-case';
import { DeleteOrderController } from './delete-order.controller';
import { DeleteOrderUseCase } from 'src/domain/order/use-cases/delete-order-use-case';
import { FindOrderController } from './find-order.controller';
import { FindOrderUseCase } from 'src/domain/order/use-cases/find-order-use-case';
import { FindAllOrderController } from './find-all-order.controller';
import { FindAllOrderUseCase } from 'src/domain/order/use-cases/find-all-order-use-case';
import { UpdateOrderUseCase } from 'src/domain/order/use-cases/update-order-use-case';
import { UpdateOrderController } from './update-order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    DeleteOrderController,
    FindAllOrderController,
    FindOrderController,
    UpdateOrderController,
  ],
  providers: [
    DeleteOrderUseCase,
    FindAllOrderUseCase,
    FindOrderUseCase,
    UpdateOrderUseCase,
    CreateOrderUseCase,
  ],
})
export class OrderModule {}
