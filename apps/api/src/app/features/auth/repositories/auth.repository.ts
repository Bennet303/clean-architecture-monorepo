import { Ability } from '@casl/ability';
import { ApiUser } from '../../../core/auth/api.user';

export abstract class AuthRepository {
  abstract authenticate(token: string): Promise<ApiUser | Error>;
  abstract createAbilityObject(user: ApiUser): Promise<Ability | Error>;
}
