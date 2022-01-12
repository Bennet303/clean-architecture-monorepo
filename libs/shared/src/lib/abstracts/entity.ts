export abstract class Entity {
  private readonly isOfTypeEntity? = true;

  readonly id: string;

  constructor(obj: Entity) {
    this.id = obj.id;
  }
}
