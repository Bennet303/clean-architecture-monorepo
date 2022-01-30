import { DTO } from '../dtos/dto';

export abstract class Model<T extends DTO> {
  protected constructor(obj: T) {
    if (obj) {
      this.fromDTO(obj);
    }
  }

  protected abstract fromDTO(dto: T): this;
  abstract toDTO(): T;
}
