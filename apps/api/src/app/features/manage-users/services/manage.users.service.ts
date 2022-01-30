import {
  CreateUserParam,
  FindOneUserParam,
  UserDTO,
} from '@clean-architecture-monorepo/dtos';
import { Model } from '@clean-architecture-monorepo/shared';

export abstract class ManageUsersService {
  abstract createUser(user: CreateUserParam): Promise<Model<UserDTO>>;
  abstract deleteUser(param: FindOneUserParam): Promise<void>;
  abstract getUser(): Promise<Model<UserDTO> | undefined>;
}
