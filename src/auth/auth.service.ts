import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/repositories/user-repository';
import * as bcrypt from 'bcrypt';
// fix arch
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
      // nao encontrou user e ou a senha n corresponde
      throw new Error('Email ou senha incorretas.');
    }
    console.log(email, password);
    throw new Error('Method not implemented.');
  }
}
