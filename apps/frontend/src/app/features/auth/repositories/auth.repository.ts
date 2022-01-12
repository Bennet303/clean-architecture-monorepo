import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { LoginResponseEntity } from '../entities/login.response.entity';

export abstract class AuthRepository {
  abstract login(): Promise<LoginResponseEntity | TranslatableError>;
}
