import { UserDTO } from '../../../core/dtos/user.dto';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { UserAlreadyExistsError } from '../errors/user.already.exists.error';
import { UserNotFoundError } from '../errors/user.not.found.error';

export abstract class ManageUsersRepository {
  abstract createUser(
    user: UserDTO
  ): Promise<UserDTO | UserAlreadyExistsError | Error>;
  abstract deleteUser(
    param: FindOneUserParam
  ): Promise<void | UserNotFoundError | Error>;
  abstract getUser(): Promise<UserDTO | UserNotFoundError | Error>;
}
