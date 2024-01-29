import { User } from 'src/domain/user/entities/user.entity';

export class AuthRequest extends Request {
  user: User;
}
