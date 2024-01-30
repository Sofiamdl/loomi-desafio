import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { Account } from '../entities/account.entity';

export interface FindClientUseCaseCaseRequest {
  id: string;
}

export interface FindClientUseCaseCaseResponse {
  client: Account;
}

@Injectable()
export class FindClientUseCase
  implements
    UseCase<FindClientUseCaseCaseRequest, FindClientUseCaseCaseResponse>
{
  constructor(private repository: AccountRepository) {}

  async execute(
    request: FindClientUseCaseCaseRequest,
  ): Promise<FindClientUseCaseCaseResponse> {
    const { id } = request;

    const client = await this.repository.findById(id);

    return { client };
  }
}
