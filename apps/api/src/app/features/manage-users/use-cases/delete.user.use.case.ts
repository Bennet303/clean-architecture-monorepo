import { FindOneUserParam } from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import {
  InvalidInputError,
  UserNotFoundError,
} from '../manage.users.feature.errors';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class DeleteUserUseCase implements UseCase<FindOneUserParam, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  async execute(
    param: FindOneUserParam
  ): Promise<void | UserNotFoundError | InvalidInputError | Error> {
    if (!param) return new InvalidInputError();

    return this.repository.deleteUser(param);
  }
}
