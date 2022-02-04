export abstract class Model<T> {
  // protected constructor(obj: T) {
  //   if (obj) {
  //     this.fromDTO(obj);
  //   }
  // }

  // protected abstract fromDTO(dto: T): this;
  abstract toDTO(): T;
}
