import { HttpStatusCode } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { environment } from '../../../environments/environment';
import { TranslatableError } from '../../core/abstracts/translatable.error';
import { BackendManageUsersDataSource } from './data-sources/backend.manage.users.data.source';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import {
  FailedCreatingUserError,
  FailedDeletingUserError,
  FailedGettingUserError,
  InvalidUserError,
} from './manage.users.feature.errors';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { ManageUsersRepositoryImpl } from './repositories/manage.users.repository.impl';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
import { GetUserUseCase } from './use-cases/get.user.use.case';

describe('feature: manage-users', () => {
  const backendURL = environment.backendUrl + '/manage-users';
  let httpMock: HttpTestingController;
  let dataSource: ManageUsersDataSource;
  let repository: ManageUsersRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ManageUsersDataSource,
          useClass: BackendManageUsersDataSource,
        },
        {
          provide: ManageUsersRepository,
          useClass: ManageUsersRepositoryImpl,
        },
        GetUserUseCase,
        CreateUserUseCase,
        DeleteUserUseCase,
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    dataSource = TestBed.inject(ManageUsersDataSource);
    repository = TestBed.inject(ManageUsersRepository);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should have a defined httpClient, dataSource and repository', () => {
    expect(httpMock).toBeDefined();
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

        const call = useCase.execute();
        const req = httpMock.expectOne(backendURL + '/get');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser, { status: HttpStatusCode.Ok, statusText: '' });

        const res = await call;

        expect(res).toBe(mockUser);
      });
    });
    describe('failure', () => {
      it('should return an FailedGettingUserError when the network fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute();
        const req = httpMock.expectOne(backendURL + '/get');
        expect(req.request.method).toBe('GET');
        req.error(new ErrorEvent('error'));

        const res = await call;

        expect(res).toBeInstanceOf(FailedGettingUserError);
      });
      it('should return an FailedGettingUserError when the http request fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute();
        const req = httpMock.expectOne(backendURL + '/get');
        expect(req.request.method).toBe('GET');
        req.flush({}, { status: HttpStatusCode.BadRequest, statusText: '' });

        const res = await call;

        expect(res).toBeInstanceOf(FailedGettingUserError);
      });
      const mockUsers = [{}, { id: '' }] as UserEntity[];
      it.each(mockUsers)(
        'should return an InvalidUserError if the user is invalid',
        async (mockUser) => {
          const call = useCase.execute();
          const req = httpMock.expectOne(backendURL + '/get');
          expect(req.request.method).toBe('GET');
          req.flush(mockUser, { status: HttpStatusCode.Ok, statusText: '' });

          const res = await call;

          expect(res).toBeInstanceOf(InvalidUserError);
        }
      );
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

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/create');
        expect(req.request.method).toBe('POST');
        req.flush({}, { status: HttpStatusCode.Created, statusText: '' });

        const res = await call;

        expect(res).not.toBeInstanceOf(TranslatableError);
      });
    });
    describe('failure', () => {
      it('should return an FailedCreatingUserError when the network fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/create');
        expect(req.request.method).toBe('POST');
        req.error(new ErrorEvent('error'));

        const res = await call;

        expect(res).toBeInstanceOf(FailedCreatingUserError);
      });
      it('should return an FailedCreatingUserError when the http request fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/create');
        expect(req.request.method).toBe('POST');
        req.flush({}, { status: HttpStatusCode.BadRequest, statusText: '' });

        const res = await call;

        expect(res).toBeInstanceOf(FailedCreatingUserError);
      });
      const mockUsers = [{}, { id: '' }] as UserEntity[];
      it.each(mockUsers)(
        'should return an InvalidUserError if the user is invalid',
        async (mockUser) => {
          const call = useCase.execute(mockUser);
          httpMock.expectNone(backendURL + '/create');

          const res = await call;

          expect(res).toBeInstanceOf(InvalidUserError);
        }
      );
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

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/delete');
        expect(req.request.method).toBe('POST');
        req.flush({}, { status: HttpStatusCode.Ok, statusText: '' });

        const res = await call;

        expect(res).not.toBeInstanceOf(TranslatableError);
      });
    });
    describe('failure', () => {
      it('should return an FailedDeletingUserError when the network fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/delete');
        expect(req.request.method).toBe('POST');
        req.error(new ErrorEvent('error'));

        const res = await call;

        expect(res).toBeInstanceOf(FailedDeletingUserError);
      });
      it('should return an FailedDeletingUserError when the http request fails', async () => {
        mockUser = new UserEntity({ id: '1' });

        const call = useCase.execute(mockUser);
        const req = httpMock.expectOne(backendURL + '/delete');
        expect(req.request.method).toBe('POST');
        req.flush({}, { status: HttpStatusCode.BadRequest, statusText: '' });

        const res = await call;

        expect(res).toBeInstanceOf(FailedDeletingUserError);
      });
      const mockUsers = [{}, { id: '' }] as UserEntity[];
      it.each(mockUsers)(
        'should return an InvalidUserError if the user is invalid',
        async (mockUser) => {
          const call = useCase.execute(mockUser);
          httpMock.expectNone(backendURL + '/delete');

          const res = await call;

          expect(res).toBeInstanceOf(InvalidUserError);
        }
      );
    });
  });
});
