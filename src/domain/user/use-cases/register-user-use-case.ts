import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user-repository';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface RegisterUserUseCaseResponse {
  user: User;
}

@Injectable()
export class RegisterUserUseCase
  implements UseCase<RegisterUserUseCaseRequest, RegisterUserUseCaseResponse>
{
  constructor(private usersRepository: UserRepository) {}

  async execute(
    request: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse> {
    const { name, email, password, type } = request;

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      created_at: new Date(),
      updated_at: new Date(),
      type,
    });

    await this.usersRepository.create(user);
    user.password = undefined;
    return { user };
  }
}
