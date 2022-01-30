/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { OrmUserModel } from '../../../core/models/typeorm/orm.user.model';
import { FindOneUserParam } from '../../../core/dtos/params/users/find.one.user.param';
import { UserNotFoundError } from '../manage.users.feature.errors';
import { ManageUsersService } from './manage.users.service';

@Injectable()
export class MockManageUsersService implements ManageUsersService {
  currentUser?: OrmUserModel;

  constructor() {
    this.currentUser = new OrmUserModel({
      id: '1',
    });
  }

  createUser(user: OrmUserModel): Promise<OrmUserModel> {
    this.currentUser = user;
    return new Promise((resolve) => setTimeout(() => resolve(user), 500));
  }
  deleteUser(param: FindOneUserParam): Promise<void> {
    if (this.currentUser) this.currentUser = undefined;
    else throw new UserNotFoundError();
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
  getUser(): Promise<OrmUserModel | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.currentUser), 500)
    );
  }
}
