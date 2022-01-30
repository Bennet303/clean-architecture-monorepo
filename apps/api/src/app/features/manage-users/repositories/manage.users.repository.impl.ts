import {
  CreateUserParam,
  FindOneUserParam,
  UserDTO,
} from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../manage.users.feature.errors';
import { ManageUsersService } from '../services/manage.users.service';
import { ManageUsersRepository } from './manage.users.repository';

@Injectable()
export class ManageUsersRepositoryImpl implements ManageUsersRepository {
  constructor(private readonly service: ManageUsersService) {}

  async createUser(user: CreateUserParam): Promise<Error | UserDTO> {
    try {
      if (await this.service.getUser()) throw new UserAlreadyExistsError();

      const res = await this.service.createUser(user);
      return res.toDTO();
    } catch (err) {
      return err as Error;
    }
  }

  async deleteUser(param: FindOneUserParam): Promise<void | Error> {
    try {
      return this.service.deleteUser(param);
    } catch (err) {
      return err as Error;
    }
  }

  async getUser(): Promise<Error | UserDTO> {
    try {
      const res = await this.service.getUser();

      if (!res) return new UserNotFoundError();

      return res.toDTO();
    } catch (err) {
      return err as Error;
    }
  }
}
