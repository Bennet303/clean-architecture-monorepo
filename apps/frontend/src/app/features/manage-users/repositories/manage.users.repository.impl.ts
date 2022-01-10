import { Injectable } from '@angular/core';
import { ManageUsersDataSource } from '../data-sources/manage.users.data.source';
import { UserEntity } from '../entities/user.entity';
import { ManageUsersRepository } from './manage.users.repository';

@Injectable()
export class ManageUsersRepositoryImpl implements ManageUsersRepository {
  constructor(private readonly dataSource: ManageUsersDataSource) {}

  async createUser(user: UserEntity): Promise<void | Error> {
    try {
      if (user && user.id) {
        return await this.dataSource.createUser(user);
      }
      throw new Error();
    } catch (error) {
      return new Error('Failed creating user');
    }
  }

  async deleteUser(user: UserEntity): Promise<void | Error> {
    try {
      if (user && user.id) {
        return await this.dataSource.deleteUser(user);
      }
      throw new Error();
    } catch (error) {
      return new Error('Failed deleting user');
    }
  }

  async getUser(): Promise<UserEntity | Error> {
    try {
      const user = await this.dataSource.getUser();
      if (user && user.id) {
        return user;
      }
      throw new Error();
    } catch (error) {
      return new Error('Failed getting user');
    }
  }
}
