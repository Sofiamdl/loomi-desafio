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

import { RegisterClientUseCase } from 'src/domain/client/use-cases/create-client-use-case';
import { CreateClientController } from './create-client.controller';
import { DeleteClientController } from './delete-client.controller';
import { DeleteClientUseCase } from 'src/domain/client/use-cases/delete-client-use-case';
import { FindAllClientController } from './find-all-client.controller';
import { FindClientController } from './find-client.controller';
import { UpdateClientController } from './update-client.controller';
import { FindClientUseCase } from 'src/domain/client/use-cases/find-client-use-case';
import { FindAllClientUseCase } from 'src/domain/client/use-cases/find-all-client-use-case';
import { UpdateClientUseCase } from 'src/domain/client/use-cases/update-client-use-case';
import { ConfirmCodeController } from './confirm-code.controller';
import { ConfirmCodeUseCase } from 'src/domain/client/use-cases/confirm-code-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateClientController,
    DeleteClientController,
    FindAllClientController,
    FindClientController,
    UpdateClientController,
    ConfirmCodeController,
  ],
  providers: [
    ConfirmCodeUseCase,
    DeleteClientUseCase,
    FindClientUseCase,
    FindAllClientUseCase,
    UpdateClientUseCase,
    RegisterClientUseCase,
  ],
})
export class ClientModule {}
