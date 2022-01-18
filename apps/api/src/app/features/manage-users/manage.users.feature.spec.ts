import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from '../../core/dtos/user.dto';
import { UserModel } from '../../core/models/user.model';
import { ManageUsersFeatureModule } from './manage.users.feature.module';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { ManageUsersService } from './services/manage.users.service';
import { MockManageUsersService } from './services/mock.manage.users.service';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
import { GetUserUseCase } from './use-cases/get.user.use.case';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from './manage.users.feature.errors';

describe('feature: manage-users', () => {
  let service: ManageUsersService;
  let repository: ManageUsersRepository;
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [ManageUsersFeatureModule],
    })
      .overrideProvider(ManageUsersService)
      .useClass(MockManageUsersService)
      .compile();

    service = testModule.get<ManageUsersService>(ManageUsersService);
    repository = testModule.get<ManageUsersRepository>(ManageUsersRepository);
  });

  it('should have a defined service and repository', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('use case: create user', () => {
    let useCase: CreateUserUseCase;
    const mockUser = new UserDTO({ id: '1' });
    let mockUserModel: UserModel;

    beforeEach(() => {
      useCase = testModule.get<CreateUserUseCase>(CreateUserUseCase);
      mockUserModel = UserModel.fromDTO(mockUser);
    });

    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });

    describe('success', () => {
      it('should create a user', async () => {
        jest.spyOn(service, 'getUser').mockResolvedValue(undefined);
        jest.spyOn(service, 'createUser').mockResolvedValue(mockUserModel);

        const res = await useCase.execute(mockUser);

        expect(service.createUser).toHaveBeenCalledTimes(1);
        expect(res).toStrictEqual(mockUser);
      });
    });

    describe('failure', () => {
      it('should return an UserAlreadyExistsError when the user already exists', async () => {
        await useCase.execute(mockUser);
        const res = await useCase.execute(mockUser);

        expect(res).toBeInstanceOf(UserAlreadyExistsError);
      });

      it('should return any error thrown within the service', async () => {
        jest.spyOn(service, 'getUser').mockResolvedValue(undefined);
        jest.spyOn(service, 'createUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute(mockUser);

        expect(service.createUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(Error);
      });
    });
  });

  describe('use case: delete user', () => {
    let useCase: DeleteUserUseCase;
    let createUseCase: CreateUserUseCase;
    const mockUser = new UserDTO({ id: '1' });

    beforeEach(() => {
      useCase = testModule.get<DeleteUserUseCase>(DeleteUserUseCase);
      createUseCase = testModule.get<CreateUserUseCase>(CreateUserUseCase);
    });

    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });

    describe('success', () => {
      it('should delete a user', async () => {
        await createUseCase.execute(mockUser);

        const res = await useCase.execute({ id: '1' });

        expect(res).not.toBeInstanceOf(Error);
      });
    });

    describe('failure', () => {
      it('should return an UserNotFoundError when the user does not exist', async () => {
        jest.spyOn(service, 'deleteUser').mockImplementation(() => {
          throw new UserNotFoundError();
        });

        const res = await useCase.execute({ id: '1' });

        expect(res).toBeInstanceOf(UserNotFoundError);
      });

      it('should return any error thrown within the service', async () => {
        jest.spyOn(service, 'deleteUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute({ id: '1' });

        expect(service.deleteUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(Error);
      });
    });
  });

  describe('use case: get user', () => {
    let useCase: GetUserUseCase;
    const mockUser = new UserDTO({ id: '1' });
    let mockUserModel: UserModel;

    beforeEach(() => {
      useCase = testModule.get<GetUserUseCase>(GetUserUseCase);
      mockUserModel = UserModel.fromDTO(mockUser);
    });

    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });

    describe('success', () => {
      it('should get a user', async () => {
        jest.spyOn(service, 'getUser').mockResolvedValue(mockUserModel);

        const res = await useCase.execute();

        expect(service.getUser).toHaveBeenCalledTimes(1);
        expect(res).toStrictEqual(mockUser);
      });
    });
    describe('failure', () => {
      it('should return any error thrown within the service', async () => {
        jest.spyOn(service, 'getUser').mockImplementation(() => {
          throw new Error();
        });

        const res = await useCase.execute();

        expect(service.getUser).toHaveBeenCalledTimes(1);
        expect(res).toBeInstanceOf(Error);
      });
    });
  });
});
