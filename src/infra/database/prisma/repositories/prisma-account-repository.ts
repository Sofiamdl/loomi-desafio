import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AccountRepository } from 'src/domain/client/repositories/account-repository';
import { Account } from 'src/domain/user/entities/account.entity';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(id: string) {
    await this.prismaService.account.delete({ where: { id } });
    return;
  }

  async create(user: Account): Promise<Account> {
    const userCreated = await this.prismaService.account.create({ data: user });
    return userCreated;
  }
}
