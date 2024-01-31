import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account-repository';
import { User } from '../../user/entities/user.entity';
import { UseCase } from 'src/core/use-case';
import { UserRepository } from '../../user/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

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
    private mailerService: MailerService,
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
    const randomCode = String(Math.floor(Math.random() * 900000) + 100000);
    const userAccount = new Account({
      address,
      name: fullName,
      contact,
      status: false,
      created_at: new Date(),
      updated_at: new Date(),
      userId: userCreated.id,
      confirmation_code: randomCode,
    });

    const accountCreated = await this.accountRepository.create(userAccount);

    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: 'Password Confirmation',
      text: `Your code is: ${randomCode}`,
      html: '',
    });

    return { user: accountCreated };
  }
}
