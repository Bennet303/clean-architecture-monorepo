import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../core/dtos/user.dto';
import { UserModel } from '../../../core/models/user.model';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { UserAlreadyExistsError } from '../errors/user.already.exists.error';
import { UserNotFoundError } from '../errors/user.not.found.error';
import { ManageUsersService } from '../services/manage.users.service';
import { ManageUsersRepository } from './manage.users.repository';

@Injectable()
export class ManageUsersRepositoryImpl implements ManageUsersRepository {
  constructor(private readonly service: ManageUsersService) {}

  async createUser(user: UserDTO): Promise<Error | UserDTO> {
    try {
      if (await this.service.getUser()) throw new UserAlreadyExistsError();

      const res = await this.service.createUser(UserModel.fromDTO(user));
      return UserModel.toDTO(res);
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

      return UserModel.toDTO(res);
    } catch (err) {
      return err as Error;
    }
  }
}
