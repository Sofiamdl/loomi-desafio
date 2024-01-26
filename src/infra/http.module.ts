import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
