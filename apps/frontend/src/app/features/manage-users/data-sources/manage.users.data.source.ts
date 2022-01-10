import { UserEntity } from '../entities/user.entity';

export abstract class ManageUsersDataSource {
  abstract getUser(): Promise<UserEntity>;
  abstract createUser(user: UserEntity): Promise<void>;
  abstract deleteUser(user: UserEntity): Promise<void>;
}
