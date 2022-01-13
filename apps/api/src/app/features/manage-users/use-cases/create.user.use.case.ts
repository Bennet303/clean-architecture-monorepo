import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { UserDTO } from '../../../core/dtos/user.dto';
import { InvalidInputError } from '../errors/invalid.input.error';
import { UserAlreadyExistsError } from '../errors/user.already.exists.error';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class CreateUserUseCase implements UseCase<UserDTO, UserDTO> {
  constructor(private readonly repository: ManageUsersRepository) {}

  async execute(
    param: UserDTO
  ): Promise<UserDTO | InvalidInputError | UserAlreadyExistsError | Error> {
    if (!param) return new InvalidInputError();

    return this.repository.createUser(param);
  }
}
