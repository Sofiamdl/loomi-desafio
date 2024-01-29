import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'src/domain/user/entities/user.entity';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';

@Injectable()
export class AdminRepositoryImpl implements AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async delete(id: string) {
    await this.prismaService.user.delete({ where: { id } });
    return;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }
  update(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<[User]> {
    const users = (await this.prismaService.user.findMany({
      where: { type: UserType.ADMIN },
    })) as [User];
    return users;
  }

  async create(user: User): Promise<User> {
    const userCreated = await this.prismaService.user.create({ data: user });
    return userCreated;
  }
}
