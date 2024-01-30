import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
// fix arch
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
      throw new Error('Email ou senha incorretas.');
    }
    throw new Error('Method not implemented.');
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);
    return { access_token: jwtToken };
    throw new Error('Method not implemented.');
  }
}
