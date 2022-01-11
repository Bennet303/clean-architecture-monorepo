import { Injectable } from '@angular/core';
import { UseCase, UserEntity } from '@clean-architecture-monorepo/shared';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class DeleteUserUseCase implements UseCase<UserEntity, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(param: UserEntity): Promise<void | Error> {
    return this.repository.deleteUser(param);
  }
}
