import { Injectable } from '@angular/core';
import { UserEntity } from '../entities/user.entity';
import { ManageUsersDataSource } from './manage.users.data.source';

@Injectable()
export class MockManageUsersDataSource implements ManageUsersDataSource {
  createUser(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  deleteUser(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  getUser(): Promise<UserEntity> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(new UserEntity({ id: '1' })), 2000)
    );
  }
}
