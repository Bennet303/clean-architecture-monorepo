import { Entity } from '@clean-architecture-monorepo/shared';

export class DTO implements Entity {
  constructor(obj: DTO) {
    Object.assign(this, obj);
  }
}
