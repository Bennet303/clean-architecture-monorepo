import { TranslatableError } from '../../../core/abstracts/errors';
import { LoginResponseEntity } from '../entities/login.response.entity';

export abstract class AuthRepository {
  abstract login(): Promise<LoginResponseEntity | TranslatableError>;
  abstract logout(): Promise<void | TranslatableError>;
}
