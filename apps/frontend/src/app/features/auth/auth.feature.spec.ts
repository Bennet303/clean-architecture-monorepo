import { TestBed } from '@angular/core/testing';
import { FailedLoggingInError } from './auth.feature.errors';
import { AuthFeatureModule } from './auth.feature.module';
import { AuthDataSource } from './data-sources/auth.data.source';
import { LoginResponseEntity } from './entities/login.response.entity';
import { AuthRepository } from './repositories/auth.repository';
import { LoginUseCase } from './use-cases/login.use.case';

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
});
