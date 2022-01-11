import { Injectable } from '@angular/core';
import { UseCase, UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(param: UserEntity): Promise<void | TranslatableError> {
    return this.repository.createUser(param);
  }
}
