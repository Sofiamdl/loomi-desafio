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
  private adminRepository: AdminRepository;
  constructor(private repository: AccountRepository) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, fullName, contact, address, idOfCurrentUser } = request;

    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    if (isUserAdmin.type != UserType.ADMIN) {
      if (id != idOfCurrentUser) {
        throw new BadRequestException();
      }
    }

    const data = {
      fullName,
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
