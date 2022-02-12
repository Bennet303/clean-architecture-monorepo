import {
  CreateUserParam,
  FindOneUserParam,
} from '@clean-architecture-monorepo/dtos';
import { UserModel } from '@clean-architecture-monorepo/model-interfaces';

export abstract class ManageUsersService {
  abstract createUser(user: CreateUserParam): Promise<UserModel>;
  abstract deleteUser(param: FindOneUserParam): Promise<void>;
  abstract getUser(): Promise<UserModel | undefined>;
}
