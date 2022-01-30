import { FindOneUserParam } from '@clean-architecture-monorepo/dtos';
import { UserModel } from '../../../core/models/user.model';

export abstract class ManageUsersService {
  abstract createUser(user: UserModel): Promise<UserModel>;
  abstract deleteUser(param: FindOneUserParam): Promise<void>;
  abstract getUser(): Promise<UserModel | undefined>;
}
