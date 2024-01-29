import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import { UserRepositoryImpl } from './prisma/repositories/prisma-user-repository';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { AdminRepositoryImpl } from './prisma/repositories/prisma-admin-repository';

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
  ],
})
export class DatabaseModule {}
