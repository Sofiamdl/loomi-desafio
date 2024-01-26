import { randomUUID } from 'node:crypto';
import { UserType } from '@prisma/client';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class User {
  public readonly id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  type: UserType;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
