import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { Account } from '../entities/account.entity';

export interface FindAllClientUseCaseRequest {}

export interface FindAllClientUseCaseResponse {
  clients: Account[];
}

@Injectable()
export class FindAllClientUseCase
  implements UseCase<FindAllClientUseCaseRequest, FindAllClientUseCaseResponse>
{
  constructor(private accountRepository: AccountRepository) {}

  async execute(): Promise<FindAllClientUseCaseResponse> {
    const clients = await this.accountRepository.findAll();
    return { clients };
  }
}
