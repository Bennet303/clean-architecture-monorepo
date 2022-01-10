import { Injectable } from '@angular/core';
import { UseCase } from '../../../core/abstracts/use.case';
import { UserEntity } from '../entities/user.entity';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(param: UserEntity): Promise<void | Error> {
    return this.repository.createUser(param);
  }
}
