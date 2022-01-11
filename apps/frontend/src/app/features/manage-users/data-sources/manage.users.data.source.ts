import { UserEntity } from '@clean-architecture-monorepo/shared';

export abstract class ManageUsersDataSource {
  abstract getUser(): Promise<UserEntity>;
  abstract createUser(user: UserEntity): Promise<void>;
  abstract deleteUser(user: UserEntity): Promise<void>;
}
