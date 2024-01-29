import { User } from 'src/domain/user/entities/user.entity';

export abstract class AdminRepository {
  abstract create(user: User): Promise<User>;
  abstract findAll(): Promise<[User]>;
  abstract findById(id: string): Promise<User>;
  abstract update(data: { name: string; id: string }): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
