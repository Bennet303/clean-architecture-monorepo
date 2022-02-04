import { UserDTO } from '@clean-architecture-monorepo/dtos';
import { Model } from './abstracts/model';

export abstract class UserModel extends Model<UserDTO> {}
