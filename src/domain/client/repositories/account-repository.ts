import { Account } from 'src/domain/user/entities/account.entity';

export abstract class AccountRepository {
  abstract create(user: Account): Promise<Account>;
  // abstract findAll(): Promise<[User]>;
  // abstract findById(id: string): Promise<User>;
  // abstract update(data: { name: string; id: string }): Promise<User>;
  // abstract delete(id: string): Promise<void>;
}
