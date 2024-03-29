import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import {
  Account,
  AccountWithoutUser,
} from 'src/domain/client/entities/account.entity';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findByUserId(id: string): Promise<Account> {
    const user = await this.prismaService.account.findUnique({
      where: { userId: id },
      include: {
        user: true,
      },
    });
    return user;
  }

  async update(
    id: string,
    data: { name?: string; contact?: string; address?: string },
  ): Promise<Account> {
    const user = await this.prismaService.account.update({
      where: { id },
      data,
    });
    return user;
  }

  async findAll(): Promise<[Account]> {
    const users = (await this.prismaService.account.findMany()) as [Account];
    return users;
  }

  async findById(id: string): Promise<Account> {
    const user = await this.prismaService.account.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    return user;
  }

  async delete(id: string) {
    await this.prismaService.account.delete({ where: { id } });
    return;
  }

  async create(user: AccountWithoutUser): Promise<Account> {
    const userCreated = await this.prismaService.account.create({ data: user });
    return userCreated;
  }
}
