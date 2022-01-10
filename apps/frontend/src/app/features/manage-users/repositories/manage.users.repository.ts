import { UserEntity } from '../entities/user.entity';

export abstract class ManageUsersRepository {
  abstract getUser(): Promise<UserEntity | Error>;
  abstract createUser(user: UserEntity): Promise<void | Error>;
  abstract deleteUser(user: UserEntity): Promise<void | Error>;
}
