import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { UserNotFoundError } from '../errors/user.not.found.error';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class DeleteUserUseCase implements UseCase<FindOneUserParam, void> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(param: FindOneUserParam): Promise<void | UserNotFoundError | Error> {
    return this.repository.deleteUser(param);
  }
}
