import { UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../../core/abstracts/translatable.error';

export abstract class ManageUsersRepository {
  abstract getUser(): Promise<UserEntity | TranslatableError>;
  abstract createUser(user: UserEntity): Promise<void | TranslatableError>;
  abstract deleteUser(user: UserEntity): Promise<void | TranslatableError>;
}
