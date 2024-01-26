import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import { UserRepositoryImpl } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class DatabaseModule {}
