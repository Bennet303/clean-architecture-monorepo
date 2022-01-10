export abstract class Entity {
  readonly id: string;

  constructor(obj: Entity) {
    this.id = obj.id;
  }
}
