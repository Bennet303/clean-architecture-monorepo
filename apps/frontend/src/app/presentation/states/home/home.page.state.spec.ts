import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { UserEntity } from '../../../features/manage-users/entities/user.entity';
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
        errorMessage: undefined,
        isLoading: false,
        user: mockUser,
      };
      spyOn(createUserUseCase, 'execute').and.resolveTo();

      await lastValueFrom(
        store.dispatch(new HomePageCreateUserAction(mockUser))
      );
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(createUserUseCase.execute).toHaveBeenCalledOnceWith(mockUser);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if creating the user fails', async () => {
      const mockError = new Error('failed creating user');
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: undefined,
      };
      spyOn(createUserUseCase, 'execute').and.resolveTo(mockError);

      await lastValueFrom(
        store.dispatch(new HomePageCreateUserAction(mockUser))
      );
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(createUserUseCase.execute).toHaveBeenCalledOnceWith(mockUser);
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
        errorMessage: undefined,
        isLoading: false,
        user: mockUser,
      };
      spyOn(getUserUseCase, 'execute').and.resolveTo(mockUser);

      await lastValueFrom(store.dispatch(new HomePageGetUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(getUserUseCase.execute).toHaveBeenCalledOnceWith();
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if getting the user fails', async () => {
      const mockError = new Error('failed getting user');
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: undefined,
      };
      spyOn(getUserUseCase, 'execute').and.resolveTo(mockError);

      await lastValueFrom(store.dispatch(new HomePageGetUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(getUserUseCase.execute).toHaveBeenCalledOnceWith();
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
        errorMessage: undefined,
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
      spyOn(deleteUserUseCase, 'execute').and.resolveTo();

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(deleteUserUseCase.execute).toHaveBeenCalledOnceWith(mockUser);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write the error to the state if deleting the user fails', async () => {
      mockUser = new UserEntity({ id: '1' });
      const mockError = new Error('failed getting user');
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
      spyOn(deleteUserUseCase, 'execute').and.resolveTo(mockError);

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(deleteUserUseCase.execute).toHaveBeenCalledOnceWith(mockUser);
      expect(res).toEqual(expectedStateModel);
    });
    it('should write an error to the state if there is currently no user to be deleted', async () => {
      const mockError = new Error('No user in state');
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        user: undefined,
      };

      await lastValueFrom(store.dispatch(new HomePageDeleteUserAction()));
      const res = store.selectSnapshot(HomePageStateSelectors.stateModel);

      expect(res).toEqual(expectedStateModel);
    });
  });
});
