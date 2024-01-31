import { Module } from '@nestjs/common';
import { AddItemController } from './add-item.controller';
import { AddToCartUseCase } from 'src/domain/cart/add-to-cart-use-case';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddItemController],
  providers: [AddToCartUseCase],
})
export class CartModule {}
