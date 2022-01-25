import { Injectable } from '@angular/core';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../../core/abstracts/errors';
import { UseCase } from '../../../core/abstracts/use.case';
import { InvalidUserError } from '../manage.users.feature.errors';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class DeleteUserUseCase implements UseCase<UserEntity, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  async execute(param: UserEntity): Promise<void | TranslatableError> {
    if (!param || !param.id) return new InvalidUserError();

    return this.repository.deleteUser(param);
  }
}
