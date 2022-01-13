import { TestBed } from '@angular/core/testing';
import { TranslatableError } from '../../core/abstracts/translatable.error';
import {
  FailedLoggingInError,
  FailedLoggingOutError,
} from './auth.feature.errors';
import { AuthFeatureModule } from './auth.feature.module';
import { AuthDataSource } from './data-sources/auth.data.source';
import { LoginResponseEntity } from './entities/login.response.entity';
import { AuthRepository } from './repositories/auth.repository';
import { LoginUseCase } from './use-cases/login.use.case';
import { LogoutUseCase } from './use-cases/logout.use.case';

describe('feature: auth', () => {
  let dataSource: AuthDataSource;
  let repository: AuthRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AuthFeatureModule] });
    dataSource = TestBed.inject(AuthDataSource);
    repository = TestBed.inject(AuthRepository);
  });
  it('should have a defined dataSource and repository', () => {
    expect(dataSource).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('use case: login', () => {
    let useCase: LoginUseCase;
    let mockLoginResponse: LoginResponseEntity;
    beforeEach(() => {
      useCase = TestBed.inject(LoginUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should login the user', async () => {
        mockLoginResponse = new LoginResponseEntity({ token: '123' });
        jest.spyOn(dataSource, 'login').mockResolvedValue(mockLoginResponse);

        const res = await useCase.execute();

        expect(dataSource.login).toHaveBeenCalledTimes(1);
        expect(res).toBe(mockLoginResponse);
      });
    });
    describe('failure', () => {
      it('should return an FailedLoggingInError when the data source fails', async () => {
        jest.spyOn(dataSource, 'login').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute();

        expect(dataSource.login).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedLoggingInError);
      });
      it('should return an FailedLoggingInError when the data source rejects the promise', async () => {
        jest.spyOn(dataSource, 'login').mockRejectedValue(new Error());

        const res = await useCase.execute();

        expect(dataSource.login).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedLoggingInError);
      });
    });
  });
  describe('use case: logout', () => {
    let useCase: LogoutUseCase;
    beforeEach(() => {
      useCase = TestBed.inject(LogoutUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should log out the user', async () => {
        jest.spyOn(dataSource, 'logout').mockResolvedValue();

        const res = await useCase.execute();

        expect(dataSource.logout).toHaveBeenCalledTimes(1);
        expect(res).not.toBeInstanceOf(TranslatableError);
      });
    });
    describe('failure', () => {
      it('should return an FailedLoggingOutError when the data source fails', async () => {
        jest.spyOn(dataSource, 'logout').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute();

        expect(dataSource.logout).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedLoggingOutError);
      });
      it('should return an FailedLoggingOutError when the data source rejects the promise', async () => {
        jest.spyOn(dataSource, 'logout').mockRejectedValue(new Error());

        const res = await useCase.execute();

        expect(dataSource.logout).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedLoggingOutError);
      });
    });
  });
});
