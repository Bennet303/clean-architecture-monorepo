import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../core/dtos/user.dto';
import { UserModel } from '../../../core/models/user.model';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { ManageUsersService } from '../services/manage.users.service';
import { ManageUsersRepository } from './manage.users.repository';

@Injectable()
export class ManageUsersRepositoryImpl implements ManageUsersRepository {
  constructor(private readonly service: ManageUsersService) {}

  async createUser(user: UserDTO): Promise<Error | UserDTO> {
    try {
      const res = await this.service.createUser(UserModel.fromDTO(user));
      return UserModel.toDTO(res);
    } catch (err) {
      return err;
    }
  }

  async deleteUser(param: FindOneUserParam): Promise<void | Error> {
    try {
      return this.service.deleteUser(param);
    } catch (err) {
      return err;
    }
  }

  async getUser(): Promise<Error | UserDTO> {
    try {
      const res = await this.service.getUser();
      return UserModel.toDTO(res);
    } catch (err) {
      return err;
    }
  }
}
