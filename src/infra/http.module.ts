import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateUserController],
  providers: [
    RegisterUserUseCase,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}
