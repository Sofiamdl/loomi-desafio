import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from '../repositories/admin-repository';

export interface DeleteAdminUseCaseRequest {
  id: string;
}

export interface DeleteAdminUseCaseResponse {}

@Injectable()
export class DeleteAdminUseCase
  implements UseCase<DeleteAdminUseCaseRequest, DeleteAdminUseCaseResponse>
{
  constructor(private repository: AdminRepository) {}

  async execute(
    request: DeleteAdminUseCaseRequest,
  ): Promise<DeleteAdminUseCaseResponse> {
    const { id } = request;

    await this.repository.delete(id);

    return;
  }
}
