import { DTO } from '@clean-architecture-monorepo/dtos';

export abstract class UseCase<I extends DTO | void, O extends DTO | void> {
  abstract execute(param: I): Promise<O | Error>;
}
