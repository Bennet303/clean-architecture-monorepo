import { ApiUser } from '../../../core/auth/api.user';
import { AuthService } from './auth.service';

export class KeycloakAuthService implements AuthService {
  private readonly baseURL: string;
  private readonly realm: string;

  authenticate(token: string): Promise<ApiUser> {
    this.baseURL = process.env.KEYCLOAK_BASE_URL;
    throw new Error('Method not implemented.');
  }
}
