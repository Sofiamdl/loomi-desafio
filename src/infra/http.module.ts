import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateUserController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
