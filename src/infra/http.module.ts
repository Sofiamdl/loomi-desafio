import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/infra/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AdminModule } from './controllers/admin/admin.module';

@Module({
  imports: [DatabaseModule, AuthModule, AdminModule],
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
