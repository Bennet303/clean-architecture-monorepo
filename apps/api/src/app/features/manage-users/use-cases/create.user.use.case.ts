import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { UserDTO } from '../../../core/dtos/user.dto';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class CreateUserUseCase implements UseCase<UserDTO, UserDTO> {
  constructor(private readonly repository: ManageUsersRepository) {}

  execute(param: UserDTO): Promise<UserDTO | Error> {
    return this.repository.createUser(param);
  }
}
