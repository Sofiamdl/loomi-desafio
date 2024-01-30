import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/client/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/infra/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AdminModule } from './controllers/admin/admin.module';
import { ClientModule } from './controllers/client/client.module';
import { ProductModule } from './controllers/product/product.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    ClientModule,
    ProductModule,
  ],
  controllers: [CreateUserController],
  providers: [
    RegisterUserUseCase,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class HttpModule {}
