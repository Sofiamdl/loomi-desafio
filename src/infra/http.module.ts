import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserController } from './controllers/user/create_user.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/infra/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CreateAdminController } from './controllers/admin/create-admin.controller';
import { DeleteAdminController } from './controllers/admin/delete-admin.controller';
import { FindAllUserController } from './controllers/admin/find-all-admin.controller';
import { FindUserController } from './controllers/admin/find-admin.controller';
import { UpdateUserController } from './controllers/admin/update-admin.controller';
import { DeleteAdminUseCase } from 'src/domain/admin/use-cases/delete-admin-use-case';
import { FindAdminsUseCase } from 'src/domain/admin/use-cases/find-all-admin-use-case';
import { FindAdminUseCase } from 'src/domain/admin/use-cases/find-admin-use-case';
import { UpdateAdminUseCase } from 'src/domain/admin/use-cases/update-admin-use-case';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    CreateUserController,
    CreateAdminController,
    DeleteAdminController,
    FindAllUserController,
    FindUserController,
    UpdateUserController,
  ],
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
    DeleteAdminUseCase,
    FindAdminsUseCase,
    FindAdminUseCase,
    UpdateAdminUseCase,
    RegisterUserUseCase,
  ],
})
export class HttpModule {}
