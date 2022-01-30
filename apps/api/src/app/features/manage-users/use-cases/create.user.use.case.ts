import { UserDTO } from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import {
  InvalidInputError,
  UserAlreadyExistsError,
} from '../manage.users.feature.errors';
import { ManageUsersRepository } from '../repositories/manage.users.repository';

@Injectable()
export class CreateUserUseCase implements UseCase<UserDTO, UserDTO> {
  constructor(private readonly repository: ManageUsersRepository) {}

  async execute(
    param: UserDTO
  ): Promise<UserDTO | InvalidInputError | UserAlreadyExistsError | Error> {
    return this.repository.createUser(param);
  }
}
