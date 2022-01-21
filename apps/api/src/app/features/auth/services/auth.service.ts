import { ApiUser } from '../../../core/auth/api.user';

export abstract class AuthService {
  abstract authenticate(token: string): Promise<ApiUser>;
}
