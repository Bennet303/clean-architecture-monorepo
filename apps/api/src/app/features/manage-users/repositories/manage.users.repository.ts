import {
  CreateUserParam,
  FindOneUserParam,
  UserDTO,
} from '@clean-architecture-monorepo/dtos';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../manage.users.feature.errors';
export abstract class ManageUsersRepository {
  abstract createUser(
    user: CreateUserParam
  ): Promise<UserDTO | UserAlreadyExistsError | Error>;
  abstract deleteUser(
    param: FindOneUserParam
  ): Promise<void | UserNotFoundError | Error>;
  abstract getUser(): Promise<UserDTO | UserNotFoundError | Error>;
}
