import { UserDTO } from '../../../core/dtos/user.dto';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';

export abstract class ManageUsersRepository {
  abstract createUser(user: UserDTO): Promise<UserDTO | Error>;
  abstract deleteUser(param: FindOneUserParam): Promise<void | Error>;
  abstract getUser(): Promise<UserDTO | Error>;
}
