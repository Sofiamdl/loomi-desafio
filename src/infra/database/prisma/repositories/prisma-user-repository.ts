import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import { User } from 'src/domain/user/entities/user';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user;
  }

  async create(user: User): Promise<User> {
    const userCreated = await this.prismaService.user.create({ data: user });
    return userCreated;
  }
}
