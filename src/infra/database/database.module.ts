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
  ],
})
export class DatabaseModule {}
