import { Module } from '@nestjs/common';
import { AddItemController } from './add-item.controller';
import { AddToCartUseCase } from 'src/domain/cart/use-cases/add-to-cart-use-case';
import { DatabaseModule } from 'src/infra/database/database.module';
import { RemoveFromCartUseCase } from 'src/domain/cart/use-cases/remove-from-cart-use-case';
import { RemoveItemController } from './remove-item.controller';
import { UpdateItemController } from './update-item.controller';
import { UpdateItemUseCase } from 'src/domain/cart/use-cases/update-item-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [AddItemController, RemoveItemController, UpdateItemController],
  providers: [AddToCartUseCase, RemoveFromCartUseCase, UpdateItemUseCase],
})
export class CartModule {}
