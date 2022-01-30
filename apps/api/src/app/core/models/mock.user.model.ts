import { UserDTO } from '@clean-architecture-monorepo/dtos';
import { Model } from '@clean-architecture-monorepo/shared';
import { RemoveMethods } from '../utils/remove.methods';

export class MockUserModel extends Model<UserDTO> {
  id!: string;

  constructor(obj: RemoveMethods<MockUserModel>) {
    super();
    Object.assign(this, obj);
  }

  toDTO(): UserDTO {
    return new UserDTO({
      id: this.id,
    });
  }
}
