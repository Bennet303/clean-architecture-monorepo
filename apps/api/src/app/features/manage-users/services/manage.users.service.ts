import { UserModel } from '../../../core/models/user.model';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';

export abstract class ManageUsersService {
  abstract createUser(user: UserModel): Promise<UserModel>;
  abstract deleteUser(param: FindOneUserParam): Promise<void>;
  abstract getUser(): Promise<UserModel>;
}
