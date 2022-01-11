import { UserEntity } from '@clean-architecture-monorepo/api-interfaces';

export abstract class ManageUsersDataSource {
  abstract getUser(): Promise<UserEntity>;
  abstract createUser(user: UserEntity): Promise<void>;
  abstract deleteUser(user: UserEntity): Promise<void>;
}
