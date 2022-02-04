/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateUserParam,
  FindOneUserParam,
} from '@clean-architecture-monorepo/dtos';
import { MockUserModel } from '@clean-architecture-monorepo/model-interfaces';
import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../manage.users.feature.errors';
import { ManageUsersService } from './manage.users.service';

@Injectable()
export class MockManageUsersService implements ManageUsersService {
  currentUser?: MockUserModel;

  constructor() {
    this.currentUser = new MockUserModel({
      id: '1',
    });
  }

  createUser(user: CreateUserParam): Promise<MockUserModel> {
    this.currentUser = new MockUserModel({
      id: user.id,
    });
    return new Promise((resolve) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setTimeout(() => resolve(this.currentUser!), 500)
    );
  }
  deleteUser(param: FindOneUserParam): Promise<void> {
    if (this.currentUser) this.currentUser = undefined;
    else throw new UserNotFoundError();
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
  getUser(): Promise<MockUserModel | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.currentUser), 500)
    );
  }
}
