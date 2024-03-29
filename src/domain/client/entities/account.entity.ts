import { randomUUID } from 'node:crypto';
import { User } from '../../user/entities/user.entity';
// import { User } from './user.entity';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class Account {
  public readonly id: string;
  name: string;
  contact: string;
  address: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  user?: User;
  userId: string;
  confirmation_code: string;

  constructor(props: Omit<Account, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}

export class AccountWithoutUser {
  public readonly id: string;
  name: string;
  contact: string;
  address: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  userId: string;
  confirmation_code?: string;

  constructor(props: Omit<Account, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
