import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from '../repositories/admin-repository';
import { User } from 'src/domain/user/entities/user.entity';

export interface FindAdminUseCaseRequest {
  id: string;
}

export interface FindAdminUseCaseResponse {
  admin: User;
}

@Injectable()
export class FindAdminUseCase
  implements UseCase<FindAdminUseCaseRequest, FindAdminUseCaseResponse>
{
  constructor(private repository: AdminRepository) {}

  async execute(
    request: FindAdminUseCaseRequest,
  ): Promise<FindAdminUseCaseResponse> {
    const { id } = request;

    const admin = await this.repository.findById(id);

    return { admin };
  }
}
