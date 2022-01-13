import { Entity } from '@clean-architecture-monorepo/shared';

export class LoginResponseEntity extends Entity {
  readonly token: string;

  constructor(obj: LoginResponseEntity) {
    super();
    this.token = obj.token;
  }
}
