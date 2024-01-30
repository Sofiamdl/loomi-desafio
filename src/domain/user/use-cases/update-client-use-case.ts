import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { Account, UserType } from '@prisma/client';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';

export interface UpdateUseCaseRequest {
  id: string;
  fullName: string;
  contact: string;
  address: string;
  idOfCurrentUser: string;
}

export interface UpdateUseCaseResponse {
  client: Account;
}

@Injectable()
export class UpdateClientUseCase
  implements UseCase<UpdateUseCaseRequest, UpdateUseCaseResponse>
{
  constructor(
    private repository: AccountRepository,
    private adminRepository: AdminRepository,
  ) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, fullName, contact, address, idOfCurrentUser } = request;
    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    const isSameUser = await this.repository.findById(id);

    if (isUserAdmin.type != UserType.ADMIN) {
      if (isSameUser.userId != idOfCurrentUser) {
        throw new BadRequestException();
      }
    }

    const data = {
      name: fullName,
      contact,
      address,
    };
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key],
    );

    const user = await this.repository.update(id, data);

    return { client: user };
  }
}
