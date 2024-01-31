import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import { UserRepositoryImpl } from './prisma/repositories/prisma-user-repository';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { AdminRepositoryImpl } from './prisma/repositories/prisma-admin-repository';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { AccountRepositoryImpl } from './prisma/repositories/prisma-account-repository';
import { ProductRepository } from 'src/domain/product/repositories/product-repository';
import { ProductRepositoryImpl } from './prisma/repositories/prisma-product-repository';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';
import { OrderRepositoryImpl } from './prisma/repositories/prisma-order-repository';
import { ItemRepository } from 'src/domain/cart/repositories/item-repository';
import { ItemRepositoryImpl } from './prisma/repositories/prisma-item-repository';
import { PaymentGateway } from 'src/domain/payment/gateway/payment-gateway';
import { PaymentService } from '../controllers/payment/stripe.service';
import { ReportRepository } from 'src/domain/report/repositories/report-repository';
import { ReportRepositoryImpl } from './prisma/repositories/prisma-report-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: AdminRepository,
      useClass: AdminRepositoryImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: ItemRepository,
      useClass: ItemRepositoryImpl,
    },
    {
      provide: PaymentGateway,
      useClass: PaymentService,
    },
    {
      provide: ReportRepository,
      useClass: ReportRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: AdminRepository,
      useClass: AdminRepositoryImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: ItemRepository,
      useClass: ItemRepositoryImpl,
    },
    {
      provide: PaymentGateway,
      useClass: PaymentService,
    },
    {
      provide: ReportRepository,
      useClass: ReportRepositoryImpl,
    },
  ],
})
export class DatabaseModule {}
