import { Injectable } from '@angular/core';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import {
  FailedLoggingInError,
  InvalidTokenError,
} from '../auth.feature.errors';
import { AuthDataSource } from '../data-sources/auth.data.source';
import { LoginResponseEntity } from '../entities/login.response.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDataSource) {}

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
