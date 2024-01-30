import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const isSameUser = await this.accountRepository.findById(id);
    if (!isUserAdmin || !isSameUser) throw new NotFoundException();

    if (isUserAdmin.type != UserType.ADMIN) {
      if (isSameUser.userId != idOfCurrentUser) {
        throw new BadRequestException();
      }
    }
    await this.accountRepository.delete(id);
    await this.adminRepository.delete(idOfCurrentUser);

    return;
  }
}
