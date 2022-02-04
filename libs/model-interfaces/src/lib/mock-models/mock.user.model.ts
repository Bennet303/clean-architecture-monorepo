import { UserDTO } from '@clean-architecture-monorepo/dtos';
import { UserModel } from '@clean-architecture-monorepo/model-interfaces';
import { RemoveMethods } from '@clean-architecture-monorepo/shared';

export class MockUserModel extends UserModel {
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
