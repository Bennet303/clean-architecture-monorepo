/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../core/models/user.model';
import { FindOneUserParam } from '../../../endpoints/manage-users/params/find.one.user.param';
import { ManageUsersService } from './manage.users.service';

@Injectable()
export class MockManageUsersService implements ManageUsersService {
  currentUser?: UserModel;

  createUser(user: UserModel): Promise<UserModel> {
    this.currentUser = user;
    return new Promise((resolve) => setTimeout(() => resolve(user), 500));
  }
  deleteUser(param: FindOneUserParam): Promise<void> {
    this.currentUser = undefined;
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
  getUser(): Promise<UserModel | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.currentUser), 500)
    );
  }
}
