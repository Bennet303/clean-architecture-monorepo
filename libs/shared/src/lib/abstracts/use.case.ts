import { Entity } from './entity';

export abstract class UseCase<
  I extends Entity | void,
  O extends Entity | void
> {
  abstract execute(param: I): Promise<O | Error>;
}
