/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../core/models/user.model';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { ManageUsersService } from './manage.users.service';

@Injectable()
export class MockManageUsersService implements ManageUsersService {
  createUser(user: UserModel): Promise<UserModel> {
    return new Promise((resolve) => setTimeout(() => resolve(user), 500));
  }
  deleteUser(param: FindOneUserParam): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
  getUser(): Promise<UserModel> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(new UserModel({ _id: '1' })), 500)
    );
  }
}
