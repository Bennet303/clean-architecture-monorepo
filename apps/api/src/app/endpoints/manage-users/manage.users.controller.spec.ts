import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ManageUsersFeatureModule } from '../../features/manage-users/manage.users.feature.module';
import { ManageUsersController } from './manage.users.controller';
import { CreateUserUseCase } from '../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../features/manage-users/use-cases/get.user.use.case';
import { ManageUsersService } from '../../features/manage-users/services/manage.users.service';
import { MockManageUsersService } from '../../features/manage-users/services/mock.manage.users.service';
import * as request from 'supertest';
import * as compression from 'compression';
import { UserNotFoundError } from '../../features/manage-users/errors/user.not.found.error';
import { UserAlreadyExistsError } from '../../features/manage-users/errors/user.already.exists.error';

describe('controller: manage-users', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let createUserUC: CreateUserUseCase;
  let deleteUserUC: DeleteUserUseCase;
  let getUserUC: GetUserUseCase;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ManageUsersFeatureModule],
      controllers: [ManageUsersController],
    })
      .overrideProvider(ManageUsersService)
      .useClass(MockManageUsersService)
      .compile();

    createUserUC = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    deleteUserUC = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase);
    getUserUC = moduleRef.get<GetUserUseCase>(GetUserUseCase);

    app = moduleRef.createNestApplication();

    app.use(compression());

    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: false,
      })
    );
    await app.init();
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('endpoint: getUser', () => {
    describe('success', () => {
      it(`should return the current user with status code ${HttpStatus.OK}`, async () => {
        const user = { id: '1' };
        jest.spyOn(getUserUC, 'execute').mockResolvedValue(user);

        const res = await request(app.getHttpServer()).get('/users');

        expect(getUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.OK);
        expect(res.body).toStrictEqual(user);
      });
    });
    describe('failure', () => {
      it(`should return with status code ${HttpStatus.NOT_FOUND} when the user is not found`, async () => {
        jest
          .spyOn(getUserUC, 'execute')
          .mockResolvedValue(new UserNotFoundError());

        const res = await request(app.getHttpServer()).get('/users');

        expect(getUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
      it(`should return with status code ${HttpStatus.INTERNAL_SERVER_ERROR} when there is an unhandled error`, async () => {
        jest.spyOn(getUserUC, 'execute').mockResolvedValue(new Error('Test'));

        const res = await request(app.getHttpServer()).get('/users');

        expect(getUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  describe('endpoint: createUser', () => {
    const user = { id: '1' };

    describe('success', () => {
      it(`should return the created user with status code ${HttpStatus.CREATED}`, async () => {
        const user = { id: '1' };
        jest.spyOn(createUserUC, 'execute').mockResolvedValue(user);

        const res = await request(app.getHttpServer())
          .post('/users')
          .send(user);

        expect(createUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.CREATED);
        expect(res.body).toStrictEqual(user);
      });
    });
    describe('failure', () => {
      const invalidUsers = [
        { id: 1 },
        { id: '2384234234234' },
        { name: 'test' },
      ];
      it.each(invalidUsers)(
        `should return with status code ${HttpStatus.BAD_REQUEST} when the user is not valid`,
        async (user) => {
          const res = await request(app.getHttpServer())
            .post('/users')
            .send(user);

          expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        }
      );
      it(`should return with status code ${HttpStatus.CONFLICT}`, async () => {
        jest
          .spyOn(createUserUC, 'execute')
          .mockResolvedValue(new UserAlreadyExistsError());

        const res = await request(app.getHttpServer())
          .post('/users')
          .send(user);

        expect(createUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.CONFLICT);
      });
      it(`should return with status code ${HttpStatus.INTERNAL_SERVER_ERROR} when there is an unhandled error`, async () => {
        jest
          .spyOn(createUserUC, 'execute')
          .mockResolvedValue(new Error('Test'));

        const res = await request(app.getHttpServer())
          .post('/users')
          .send(user);

        expect(createUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  describe('endpoint: deleteUser', () => {
    describe('success', () => {
      it(`should return with status code ${HttpStatus.NO_CONTENT}`, async () => {
        jest.spyOn(deleteUserUC, 'execute').mockResolvedValue();

        const res = await request(app.getHttpServer()).delete('/users/1');

        expect(deleteUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
      });
    });
    describe('failure', () => {
      it(`should return with status code ${HttpStatus.NOT_FOUND} when the user is not found`, async () => {
        jest
          .spyOn(deleteUserUC, 'execute')
          .mockResolvedValue(new UserNotFoundError());

        const res = await request(app.getHttpServer()).delete('/users/1');

        expect(deleteUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
      it(`should return with status code ${HttpStatus.BAD_REQUEST} when the user id is not valid`, async () => {
        const res = await request(app.getHttpServer()).delete(
          '/users/78923452345'
        );

        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
      it(`should return with status code ${HttpStatus.INTERNAL_SERVER_ERROR} when there is an unhandled error`, async () => {
        jest
          .spyOn(deleteUserUC, 'execute')
          .mockResolvedValue(new Error('Test'));

        const res = await request(app.getHttpServer()).delete('/users/1');

        expect(deleteUserUC.execute).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });
});
