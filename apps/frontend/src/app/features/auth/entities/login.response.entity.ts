import { Entity } from '@clean-architecture-monorepo/shared';
import { RolesEnum } from '../../../core/enums/roles.enum';

export class LoginResponseEntity extends Entity {
  readonly token: string;
  readonly role: RolesEnum;

  constructor(obj: LoginResponseEntity) {
    super();
    this.token = obj.token;
    this.role = obj.role;
  }
}
