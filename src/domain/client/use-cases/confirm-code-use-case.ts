import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account-repository';
import { UserRepository } from '../../user/repositories/user-repository';
import { UseCase } from 'src/core/use-case';

export interface ConfirmCodeUseCaseRequest {
  email: string;
  code: string;
}

export interface ConfirmCodeUseCaseResponse {
  user: Account;
}

@Injectable()
export class ConfirmCodeUseCase
  implements UseCase<ConfirmCodeUseCaseRequest, ConfirmCodeUseCaseResponse>
{
  constructor(
    private usersRepository: UserRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute(
    request: ConfirmCodeUseCaseRequest,
  ): Promise<ConfirmCodeUseCaseResponse> {
    const { code, email } = request;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email not registered');
    }

    const account = await this.accountRepository.findByUserId(user.id);
    if (code != account.confirmation_code)
      throw new BadRequestException('Code is wrong');

    await this.accountRepository.update(account.id, { status: true });

    return { user: account };
  }
}
