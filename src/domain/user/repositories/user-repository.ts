import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
}
