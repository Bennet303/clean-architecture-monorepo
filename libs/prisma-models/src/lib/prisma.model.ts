import { Model } from '@clean-architecture-monorepo/shared';

export abstract class PrismaModel<D, M> extends Model<D> {
  protected internalModel: M;

  protected constructor(obj: M) {
    super();
    this.internalModel = obj;
  }
}
