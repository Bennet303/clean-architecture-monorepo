import { Entity } from '../../../../../../../libs/shared/src';

export class LoginResponseEntity extends Entity {
  readonly token: string;

  constructor(obj: LoginResponseEntity) {
    super();
    this.token = obj.token;
  }
}
