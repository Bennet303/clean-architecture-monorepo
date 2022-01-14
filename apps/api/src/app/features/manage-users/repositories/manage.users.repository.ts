import { UserDTO } from '../../../core/dtos/user.dto';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../manage.users.feature.errors';
export abstract class ManageUsersRepository {
  abstract createUser(
    user: UserDTO
  ): Promise<UserDTO | UserAlreadyExistsError | Error>;
  abstract deleteUser(
    param: FindOneUserParam
  ): Promise<void | UserNotFoundError | Error>;
  abstract getUser(): Promise<UserDTO | UserNotFoundError | Error>;
}
