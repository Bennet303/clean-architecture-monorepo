import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { UserDTO } from '../../../core/dtos/user.dto';
import { UserNotFoundError } from '../errors/user.not.found.error';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class GetUserUseCase implements UseCase<void, UserDTO> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(): Promise<UserDTO | UserNotFoundError | Error> {
    return this.repository.getUser();
  }
}
