import { Injectable } from '@angular/core';
import { UseCase } from '../../../core/abstracts/use.case';
import { UserEntity } from '../entities/user.entity';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class GetUserUseCase implements UseCase<void, UserEntity> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(): Promise<UserEntity | Error> {
    return this.repository.getUser();
  }
}
