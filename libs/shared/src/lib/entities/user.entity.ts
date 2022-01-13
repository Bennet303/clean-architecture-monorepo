import { Entity } from '../abstracts/entity';

export class UserEntity extends Entity {
  readonly id: string;

  constructor(obj: UserEntity) {
    super();
    this.id = obj.id;
  }
}
