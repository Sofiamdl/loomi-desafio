import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';
import { UserType } from '@prisma/client';

export interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
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
    const { name, email, password } = request;

    const user = new User({
      name,
      email,
      password_hash: password,
      created_at: new Date(),
      updated_at: new Date(),
      type: UserType.CLIENT,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
