import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from '../repositories/admin-repository';
import { User } from 'src/domain/user/entities/user.entity';

export interface UpdateUseCaseRequest {
  id: string;
  name: string;
}

export interface UpdateUseCaseResponse {
  admin: User;
}

@Injectable()
export class UpdateAdminUseCase
  implements UseCase<UpdateUseCaseRequest, UpdateUseCaseResponse>
{
  constructor(private repository: AdminRepository) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, name } = request;

    const user = await this.repository.update({ id, name });

    return { admin: user };
  }
}
