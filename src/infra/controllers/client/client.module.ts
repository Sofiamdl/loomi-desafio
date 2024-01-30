import { Module } from '@nestjs/common';
// import { CreateAdminController } from './create-client.controller';
// import { DeleteAdminController } from './delete-client.controller';
// import { FindAllUserController } from './find-all-client.controller';
// import { UpdateUserController } from './update-client.controller';
// import { FindUserController } from './find-client.controller';
// import { DeleteAdminUseCase } from 'src/domain/admin/use-cases/delete-admin-use-case';
// import { FindAdminsUseCase } from 'src/domain/admin/use-cases/find-all-admin-use-case';
// import { FindAdminUseCase } from 'src/domain/admin/use-cases/find-admin-use-case';
// import { UpdateAdminUseCase } from 'src/domain/admin/use-cases/update-admin-use-case';
import { DatabaseModule } from 'src/infra/database/database.module';
// import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';

import { RegisterClientUseCase } from 'src/domain/client/create-client-use-case';
import { CreateClientController } from './create-client.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateClientController,
    // DeleteAdminController,
    // FindAllUserController,
    // FindUserController,
    // UpdateUserController,
  ],
  providers: [
    // DeleteAdminUseCase,
    // FindAdminsUseCase,
    // FindAdminUseCase,
    // UpdateAdminUseCase,
    RegisterClientUseCase,
  ],
})
export class ClientModule {}
