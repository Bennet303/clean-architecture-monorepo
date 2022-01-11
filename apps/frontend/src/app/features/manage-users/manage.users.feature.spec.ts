import { TestBed } from '@angular/core/testing';
import { UserEntity } from '@clean-architecture-monorepo/api-interfaces';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
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

        expect(dataSource.getUser).toHaveBeenCalled();
        expect(res).toBe(mockUser);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails fetching the user from the backend', async () => {
        jest.spyOn(dataSource, 'getUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalled();
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        jest.spyOn(dataSource, 'getUser').mockRejectedValue(new Error());

        const res = await useCase.execute();

        expect(dataSource.getUser).toHaveBeenCalled();
        expect(res).toBeInstanceOf(Error);
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
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });
          jest.spyOn(dataSource, 'getUser').mockResolvedValue(mockUser);

          const res = await useCase.execute();

          expect(dataSource.getUser).toHaveBeenCalled();
          expect(res).toBeInstanceOf(Error);
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
        expect(res).not.toBeInstanceOf(Error);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails creating the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'createUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'createUser').mockRejectedValue(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.createUser).toHaveBeenCalledWith(mockUser);
        expect(res).toBeInstanceOf(Error);
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
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(res).toBeInstanceOf(Error);
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
        expect(res).not.toBeInstanceOf(Error);
      });
    });
    describe('failure', () => {
      it('should return an error when the data source fails deleting the user', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'deleteUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledWith(mockUser);
        expect(res).toBeInstanceOf(Error);
      });
      it('should return an error when the data source rejects the promise', async () => {
        mockUser = new UserEntity({ id: '1' });
        jest.spyOn(dataSource, 'deleteUser').mockRejectedValue(new Error());

        const res = await useCase.execute(mockUser);

        expect(dataSource.deleteUser).toHaveBeenCalledWith(mockUser);
        expect(res).toBeInstanceOf(Error);
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
        it('should return an error when the users id is empty', async () => {
          mockUser = new UserEntity({ id: '' });

          const res = await useCase.execute(mockUser);

          expect(res).toBeInstanceOf(Error);
        });
      });
    });
  });
});
