import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from '../repositories/admin-repository';
import { User } from '.prisma/client';

export interface FindUserUseCaseRequest {}

export interface FindUserUseCaseResponse {
  admins: User[];
}

@Injectable()
export class FindAdminsUseCase
  implements UseCase<FindUserUseCaseRequest, FindUserUseCaseResponse>
{
  constructor(private adminRepository: AdminRepository) {}

  async execute(): Promise<FindUserUseCaseResponse> {
    const admins = await this.adminRepository.findAll();
    return { admins };
  }
}
