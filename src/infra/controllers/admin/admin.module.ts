import { Module } from '@nestjs/common';
import { CreateAdminController } from './create-admin.controller';
import { DeleteAdminController } from './delete-admin.controller';
import { FindAllUserController } from './find-all-admin.controller';
import { UpdateUserController } from './update-admin.controller';
import { FindUserController } from './find-admin.controller';
import { DeleteAdminUseCase } from 'src/domain/admin/use-cases/delete-admin-use-case';
import { FindAdminsUseCase } from 'src/domain/admin/use-cases/find-all-admin-use-case';
import { FindAdminUseCase } from 'src/domain/admin/use-cases/find-admin-use-case';
import { UpdateAdminUseCase } from 'src/domain/admin/use-cases/update-admin-use-case';
import { DatabaseModule } from 'src/infra/database/database.module';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAdminController,
    DeleteAdminController,
    FindAllUserController,
    FindUserController,
    UpdateUserController,
  ],
  providers: [
    DeleteAdminUseCase,
    FindAdminsUseCase,
    FindAdminUseCase,
    UpdateAdminUseCase,
    RegisterUserUseCase,
  ],
})
export class AdminModule {}
