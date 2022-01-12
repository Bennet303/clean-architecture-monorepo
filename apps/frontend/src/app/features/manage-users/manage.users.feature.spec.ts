import { TestBed } from '@angular/core/testing';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { TranslatableError } from '../../core/abstracts/translatable.error';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import {
  FailedCreatingUserError,
  FailedDeletingUserError,
  FailedGettingUserError,
  InvalidUserError,
} from './manage.users.feature.errors';
import { ManageUsersFeatureModule } from './manage.users.feature.module';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
import { GetUserUseCase } from './use-cases/get.user.use.case';

describe('feature: manage-users', () => {
  let dataSource: ManageUsersDataSource;
  let repository: ManageUsersRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ManageUsersFeatureModule] });
    dataSource = TestBed.inject(ManageUsersDataSource);
    repository = TestBed.inject(ManageUsersRepository);
  });
  it('should have a defined dataSource and repository', () => {
    expect(dataSource).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('use case: get user', () => {
    let useCase: GetUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      useCase = TestBed.inject(GetUserUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should get the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'getUser').mockResolvedValue(mockUser);

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledTimes(1);
        expect(res).toBe(mockUser);
      });
    });
    describe('failure', () => {
      it('should return an FailedGettingUserError when the data source fails fetching the user from the backend', async () => {
        jest.spyOn(dataSource, 'getUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedGettingUserError);
      });
      it('should return an FailedGettingUserError when the data source rejects the promise', async () => {
        jest.spyOn(dataSource, 'getUser').mockRejectedValue(new Error());

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedGettingUserError);
      });
      describe('user is invalid', () => {
        // it('should return an error when the user is undefined', async () => {
        //   mockUser = undefined;
        //   jest.spyOn(dataSource, 'getUser').mockResolvedValue(undefined); //.and.resolveTo(mockUser);

        //   const res = await useCase.execute();

        //   expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        //   expect(res).toBeInstanceOf(Error);
        // });
        // it('should return an error when the users id is undefined', async () => {
        //   mockUser = new UserEntity({ id: undefined });
        //   jest.spyOn(dataSource, 'getUser').and.resolveTo(mockUser);

        //   const res = await useCase.execute();

        //   expect(dataSource.getUser).toHaveBeenCalledOnceWith();
        //   expect(res).toBeInstanceOf(Error);
        // });
        it('should return an InvalidUserError when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });
          jest.spyOn(dataSource, 'getUser').mockResolvedValue(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalledTimes(1);
          expect(res).toBeInstanceOf(InvalidUserError);
        });
      });
    });
  });
  describe('use case: create user', () => {
    let useCase: CreateUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      useCase = TestBed.inject(CreateUserUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should create the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'createUser').mockResolvedValue();

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.createUser).toHaveBeenCalledTimes(1);
        expect(res).not.toBeInstanceOf(TranslatableError);
      });
    });
    describe('failure', () => {
      it('should return an FailedCreatingUserError when the data source fails creating the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'createUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.createUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedCreatingUserError);
      });
      it('should return an FailedCreatingUserError when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'createUser').mockRejectedValue(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.createUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedCreatingUserError);
      });
      describe('user is invalid', () => {
        // it('should return an error when the user is undefined', async () => {
        //   mockUser = undefined;

        //   const res = await useCase.execute(mockUser);

        //   expect(res).toBeInstanceOf(Error);
        // });
        // it('should return an error when the users id is undefined', async () => {
        //   mockUser = new UserEntity({ id: undefined });

        //   const res = await useCase.execute(mockUser);

        //   expect(res).toBeInstanceOf(Error);
        // });
        it('should return an InvalidUserError when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(res).toBeInstanceOf(InvalidUserError);
        });
      });
    });
  });
  describe('use case: delete user', () => {
    let useCase: DeleteUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      useCase = TestBed.inject(DeleteUserUseCase);
    });
    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });
    describe('success', () => {
      it('should delete the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'deleteUser').mockResolvedValue();

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.deleteUser).toHaveBeenCalledTimes(1);
        expect(res).not.toBeInstanceOf(TranslatableError);
      });
    });
    describe('failure', () => {
      it('should return an FailedDeletingUserError when the data source fails deleting the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'deleteUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.deleteUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedDeletingUserError);
      });
      it('should return an FailedDeletingUserError when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'deleteUser').mockRejectedValue(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledWith(mockUser);
        expect(dataSource.deleteUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(FailedDeletingUserError);
      });
      describe('user is invalid', () => {
        // it('should return an error when the user is undefined', async () => {
        //   mockUser = undefined;

        //   const res = await useCase.execute(mockUser);

        //   expect(res).toBeInstanceOf(Error);
        // });
        // it('should return an error when the users id is undefined', async () => {
        //   mockUser = new UserEntity({ id: undefined });

        //   const res = await useCase.execute(mockUser);

        //   expect(res).toBeInstanceOf(Error);
        // });
        it('should return an InvalidUserError when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(res).toBeInstanceOf(InvalidUserError);
        });
      });
    });
  });
});
