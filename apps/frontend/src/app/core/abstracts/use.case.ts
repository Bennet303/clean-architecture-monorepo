import { Entity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from './errors';

export abstract class UseCase<
  I extends Entity | void,
  O extends Entity | void
> {
  abstract execute(param: I): Promise<O | TranslatableError>;
}
