import { Injectable } from '@angular/core';
import { TranslatableError } from '../../../core/abstracts/errors';
import {
  FailedLoggingInError,
  FailedLoggingOutError,
  InvalidTokenError,
} from '../auth.feature.errors';
import { AuthDataSource } from '../data-sources/auth.data.source';
import { LoginResponseEntity } from '../entities/login.response.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDataSource) {}

  async logout(): Promise<void | TranslatableError> {
    try {
      return await this.dataSource.logout();
    } catch (error) {
      return error instanceof TranslatableError
        ? error
        : new FailedLoggingOutError();
    }
  }

  async login(): Promise<LoginResponseEntity | TranslatableError> {
    try {
      const res = await this.dataSource.login();

      if (!res || !res.token) throw new InvalidTokenError();

      return res;
    } catch (error) {
      return error instanceof TranslatableError
        ? error
        : new FailedLoggingInError();
    }
  }
}
