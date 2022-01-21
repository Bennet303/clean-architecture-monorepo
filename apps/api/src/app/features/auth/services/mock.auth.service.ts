import { Injectable } from '@nestjs/common';
import { ApiUser } from '../../../core/auth/api.user';
import { AuthService } from './auth.service';

@Injectable()
export class MockAuthService implements AuthService {
  authenticate(token: string): Promise<ApiUser> {
    throw new Error('Method not implemented.');
  }
}
