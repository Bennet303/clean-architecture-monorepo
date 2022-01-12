import { TestBed } from '@angular/core/testing';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { NgxsModule, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { TranslatableError } from '../../../core/abstracts/translatable.error';
import { ManageUsersFeatureModule } from '../../../features/manage-users/manage.users.feature.module';
import { CreateUserUseCase } from '../../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../../features/manage-users/use-cases/get.user.use.case';
import { HomePageState } from './home.page.state';
import {
  HomePageCreateUserAction,
  HomePageDeleteUserAction,
  HomePageGetUserAction,
} from './home.page.state.actions';
import { NoUserInStateError } from './home.page.state.errors';
import {
  defaultHomePageStateModel,
  HomePageStateModel,
} from './home.page.state.model';
import { HomePageStateSelectors } from './home.page.state.selectors';

describe('state: home', () => {
  let store: Store;
  let expectedStateModel: HomePageStateModel;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HomePageState]), ManageUsersFeatureModule],
    });
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      home: defaultHomePageStateModel,
    });
  });
  describe('action: create user', () => {
    let createUserUseCase: CreateUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      createUserUseCase = TestBed.inject(CreateUserUseCase);
    });
    it('should create the user', async () => {
      mockUser = new UserEntity({ id: '1' });
      expectedStateModel = {
        errorMessage: '',
        isLoading: false,
        user: mockUser,
      };
      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue();

      await lastValueFrom(
        store.dispatch(new HomePageCreateUserAction(mockUser))
      );
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(mockUser);
      expect(createUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if creating the user fails', async () => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: undefined,
      };
      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(mockError);

      await lastValueFrom(
        store.dispatch(new HomePageCreateUserAction(mockUser))
      );
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(mockUser);
      expect(res).toEqual(expectedStateModel);
    });
  });
  describe('action: get user', () => {
    let getUserUseCase: GetUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      getUserUseCase = TestBed.inject(GetUserUseCase);
    });
    it('should get the user', async () => {
      mockUser = new UserEntity({ id: '1' });
      expectedStateModel = {
        errorMessage: '',
        isLoading: false,
        user: mockUser,
      };
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(mockUser);

      await lastValueFrom(store.dispatch(new HomePageGetUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(getUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if getting the user fails', async () => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: undefined,
      };
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(mockError);

      await lastValueFrom(store.dispatch(new HomePageGetUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(getUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
  });
  describe('action: delete user', () => {
    let deleteUserUseCase: DeleteUserUseCase;
    let mockUser: UserEntity;
    beforeEach(() => {
      deleteUserUseCase = TestBed.inject(DeleteUserUseCase);
    });
    it('should delete the user', async () => {
      mockUser = new UserEntity({ id: '1' });
      expectedStateModel = {
        errorMessage: '',
        isLoading: false,
        user: undefined,
      };
      store.reset({
        ...store.snapshot(),
        home: {
          ...defaultHomePageStateModel,
          user: mockUser,
        } as HomePageStateModel,
      });
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue();

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(mockUser);
      expect(deleteUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if deleting the user fails', async () => {
      mockUser = new UserEntity({ id: '1' });
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: mockUser,
      };
      store.reset({
        ...store.snapshot(),
        home: {
          ...defaultHomePageStateModel,
          user: mockUser,
        } as HomePageStateModel,
      });
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(mockError);

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(mockUser);
      expect(deleteUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write an error to the state if there is currently no user to be deleted', async () => {
      expectedStateModel = {
        errorMessage: new NoUserInStateError().message,
        isLoading: false,
        user: undefined,
      };

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(res).toEqual(expectedStateModel);
    });
  });
});
