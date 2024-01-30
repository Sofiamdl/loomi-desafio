import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../../client/repositories/account-repository';
import { User } from '../entities/user.entity';
import { UseCase } from 'src/core/use-case';
import { UserRepository } from '../repositories/user-repository';
import * as bcrypt from 'bcrypt';

export interface RegisterClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
  fullName: string;
  contact: string;
  address: string;
}

export interface RegisterClientUseCaseResponse {
  user: Account;
}

@Injectable()
export class RegisterClientUseCase
  implements
    UseCase<RegisterClientUseCaseRequest, RegisterClientUseCaseResponse>
{
  constructor(
    private usersRepository: UserRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute(
    request: RegisterClientUseCaseRequest,
  ): Promise<RegisterClientUseCaseResponse> {
    const { name, email, password, fullName, contact, address } = request;

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      created_at: new Date(),
      updated_at: new Date(),
      type: UserType.CLIENT,
    });

    const userCreated = await this.usersRepository.create(user);

    const userAccount = new Account({
      address,
      name: fullName,
      contact,
      status: false,
      created_at: new Date(),
      updated_at: new Date(),
      // user: userCreated,
      userId: userCreated.id,
    });

    const accountCreated = await this.accountRepository.create(userAccount);
    // enviar codigo de confirmacao para ativar conta
    return { user: accountCreated };
  }
}
