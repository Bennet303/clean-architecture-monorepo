import { Injectable } from '@angular/core';
import { LoginResponseEntity } from '../entities/login.response.entity';
import { AuthDataSource } from './auth.data.source';

@Injectable()
export class MockAuthDataSource implements AuthDataSource {
  logout(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  login(): Promise<LoginResponseEntity> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(new LoginResponseEntity({ token: '123' })), 2000)
    );
  }
}
