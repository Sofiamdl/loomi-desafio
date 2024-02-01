import { Mock, describe, expect, it, vi } from 'vitest';
import {
  RegisterClientUseCase,
  RegisterClientUseCaseRequest,
} from './create-client-use-case';
import { UserType } from '@prisma/client';
import { AsMock } from 'src/core/logic/AsMock';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import { AccountRepository } from '../repositories/account-repository';
import { MailerService } from '@nestjs-modules/mailer';
import bcrypt from 'bcrypt';

describe('should successfully confirm code for registered user', () => {
  it('should create a new user with hashed password and UserType.CLIENT type when executed', async () => {
    const usersRepositoryMock = {
      create: vi.fn().mockResolvedValue({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        type: UserType.CLIENT,
        id: '1',
      }),
    };

    const accountRepositoryMock = {
      create: vi.fn().mockResolvedValue({
        address: '123 Main St',
        name: 'John Doe',
        contact: '1234567890',
        status: false,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        userId: '1',
        confirmation_code: expect.any(String),
      }),
    };

    const mailerServiceMock = {
      sendMail: vi.fn(),
    };

    const registerClientUseCase = new RegisterClientUseCase(
      AsMock<UserRepository>(usersRepositoryMock),
      AsMock<AccountRepository>(accountRepositoryMock),
      AsMock<MailerService>(mailerServiceMock),
    );

    const bcryptCompareMock = vi.spyOn(bcrypt, 'hash') as Mock;
    bcryptCompareMock.mockResolvedValue('password');

    const payload: RegisterClientUseCaseRequest = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      fullName: 'John Doe',
      contact: '1234567890',
      address: '123 Main St',
    };

    const result = await registerClientUseCase.execute(payload);

    expect(usersRepositoryMock.create).toHaveBeenCalled();
    expect(accountRepositoryMock.create).toHaveBeenCalled();
    expect(mailerServiceMock.sendMail).toHaveBeenCalled();
    expect(result.user).toEqual({
      address: '123 Main St',
      name: 'John Doe',
      contact: '1234567890',
      status: false,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      userId: '1',
      confirmation_code: expect.any(String),
    });
  });
});
