import { Injectable } from '@angular/core';
import { UserEntity } from '@clean-architecture-monorepo/api-interfaces';
import { ManageUsersDataSource } from './manage.users.data.source';

@Injectable()
export class MockManageUsersDataSource implements ManageUsersDataSource {
  createUser(user: UserEntity): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  deleteUser(user: UserEntity): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  getUser(): Promise<UserEntity> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(new UserEntity({ id: '1' })), 2000)
    );
  }
}
