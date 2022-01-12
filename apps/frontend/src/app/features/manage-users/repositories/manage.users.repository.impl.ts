import { Injectable } from '@angular/core';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../../core/abstracts/translatable.error';
import { ManageUsersDataSource } from '../data-sources/manage.users.data.source';
import {
  FailedCreatingUserError,
  FailedDeletingUserError,
  FailedGettingUserError,
  InvalidUserError,
} from '../manage.users.feature.errors';
import { ManageUsersRepository } from './manage.users.repository';

@Injectable()
export class ManageUsersRepositoryImpl implements ManageUsersRepository {
  constructor(private readonly dataSource: ManageUsersDataSource) {}

  async createUser(user: UserEntity): Promise<void | TranslatableError> {
    try {
      if (!user || !user.id) throw new InvalidUserError();

      return await this.dataSource.createUser(user);
    } catch (error) {
      return error instanceof TranslatableError
        ? error
        : new FailedCreatingUserError();
    }
  }

  async deleteUser(user: UserEntity): Promise<void | TranslatableError> {
    try {
      if (!user || !user.id) throw new InvalidUserError();

      return await this.dataSource.deleteUser(user);
    } catch (error) {
      return error instanceof TranslatableError
        ? error
        : new FailedDeletingUserError();
    }
  }

  async getUser(): Promise<UserEntity | TranslatableError> {
    try {
      const user = await this.dataSource.getUser();

      if (!user || !user.id) throw new InvalidUserError();

      return user;
    } catch (error) {
      return error instanceof TranslatableError
        ? error
        : new FailedGettingUserError();
    }
  }
}
