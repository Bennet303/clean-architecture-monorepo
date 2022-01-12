import { Injectable } from '@angular/core';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { UseCase } from '../../../../../core/abstracts/use.case';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class GetUserUseCase implements UseCase<void, UserEntity> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(): Promise<UserEntity | TranslatableError> {
    return this.repository.getUser();
  }
}
