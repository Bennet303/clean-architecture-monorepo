import { LoginResponseEntity } from '../entities/login.response.entity';

export abstract class AuthDataSource {
  abstract login(): Promise<LoginResponseEntity>;
  abstract logout(): Promise<void>;
}
