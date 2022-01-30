import { FindOneUserParam } from '../../../core/dtos/params/users/find.one.user.param';
import { UserModel } from '../../../core/models/base/user.model';

export abstract class ManageUsersService {
  abstract createUser(user: UserModel): Promise<UserModel>;
  abstract deleteUser(param: FindOneUserParam): Promise<void>;
  abstract getUser(): Promise<UserModel | undefined>;
}
