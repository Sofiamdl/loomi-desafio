import { User } from 'src/domain/user/entities/user';

export class AuthRequest extends Request {
  user: User;
}
