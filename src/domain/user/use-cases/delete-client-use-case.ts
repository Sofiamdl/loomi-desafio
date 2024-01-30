import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';

export interface DeleteClientUseCaseRequest {
  id: string;
  idOfCurrentUser: string;
}

export interface DeleteClientUseCaseResponse {}

@Injectable()
export class DeleteClientUseCase
  implements UseCase<DeleteClientUseCaseRequest, DeleteClientUseCaseResponse>
{
  constructor(
    private adminRepository: AdminRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute(
    request: DeleteClientUseCaseRequest,
  ): Promise<DeleteClientUseCaseResponse> {
    const { id, idOfCurrentUser } = request;
    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    if (isUserAdmin.type != UserType.ADMIN) {
      if (id != idOfCurrentUser) {
        throw new BadRequestException();
      }
    }
    await this.accountRepository.delete(id);
    await this.adminRepository.delete(id);

    return;
  }
}
