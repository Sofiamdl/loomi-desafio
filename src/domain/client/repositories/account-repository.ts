import { Account } from 'src/domain/user/entities/account.entity';

export abstract class AccountRepository {
  abstract create(user: Account): Promise<Account>;
  abstract findAll(): Promise<[Account]>;
  abstract findById(id: string): Promise<Account>;
  abstract update(
    id: string,
    data: {
      name?: string;
      contact?: string;
      address?: string;
    },
  ): Promise<Account>;
  abstract delete(id: string): Promise<void>;
}
