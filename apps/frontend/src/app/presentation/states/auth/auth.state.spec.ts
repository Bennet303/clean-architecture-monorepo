/* eslint-disable jest/no-done-callback */
import { TestBed } from '@angular/core/testing';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { TranslatableError } from '../../../core/abstracts/errors';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { AuthFeatureModule } from '../../../features/auth/auth.feature.module';
import { LoginResponseEntity } from '../../../features/auth/entities/login.response.entity';
import { LoginUseCase } from '../../../features/auth/use-cases/login.use.case';
import { LogoutUseCase } from '../../../features/auth/use-cases/logout.use.case';
import { AuthState } from './auth.state';
import {
  AuthStateLoginAction,
  AuthStateLogoutAction,
} from './auth.state.actions';
import { AuthStateModel, defaultAuthStateModel } from './auth.state.model';
import { AuthStateSelectors } from './auth.state.selectors';

describe('state: auth', () => {
  let store: Store;
  let actions$: Actions;
  let expectedStateModel: AuthStateModel;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState]), AuthFeatureModule],
    });
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
    store.reset({
      ...store.snapshot(),
      auth: defaultAuthStateModel,
    });
  });
  describe('action: login', () => {
    let loginUseCase: LoginUseCase;
    let mockLoginResponse: LoginResponseEntity;
    beforeEach(() => {
      loginUseCase = TestBed.inject(LoginUseCase);
    });
    it('should write the data to the state', (done) => {
      mockLoginResponse = new LoginResponseEntity({
        token: '123',
        role: RolesEnum.User,
      });
      expectedStateModel = {
        errorMessage: '',
        isLoading: false,
        token: mockLoginResponse.token,
        role: mockLoginResponse.role,
      };
      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(mockLoginResponse);

      actions$.pipe(ofActionDispatched(Navigate)).subscribe(() => {
        const res = store.selectSnapshot(AuthStateSelectors.stateModel);

        expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedStateModel);

        done();
      });

      store.dispatch(new AuthStateLoginAction());
    });
    it('should write the error to the state', async () => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        token: '',
      };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(mockError);

      await lastValueFrom(store.dispatch(new AuthStateLoginAction()));
      const res = store.selectSnapshot(AuthStateSelectors.stateModel);

      expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
  });
  describe('action: logout', () => {
    let logoutUseCase: LogoutUseCase;
    beforeEach(() => {
      logoutUseCase = TestBed.inject(LogoutUseCase);
    });
    it('should call the use case to log out the user without an error message', (done) => {
      expectedStateModel = {
        errorMessage: '',
        isLoading: false,
        token: '',
      };
      jest.spyOn(logoutUseCase, 'execute').mockResolvedValue();

      actions$.pipe(ofActionDispatched(Navigate)).subscribe(() => {
        const res = store.selectSnapshot(AuthStateSelectors.stateModel);

        expect(logoutUseCase.execute).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedStateModel);

        done();
      });

      store.dispatch(new AuthStateLogoutAction());
    });
    it('should call the use case to log out the user with an error message', (done) => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        token: '',
      };
      jest.spyOn(logoutUseCase, 'execute').mockResolvedValue();

      actions$.pipe(ofActionDispatched(Navigate)).subscribe(() => {
        const res = store.selectSnapshot(AuthStateSelectors.stateModel);

        expect(logoutUseCase.execute).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedStateModel);

        done();
      });

      store.dispatch(new AuthStateLogoutAction(mockError));
    });
    it('should write the error message to the state if the use case fails to log out the user', (done) => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        token: '',
      };
      jest.spyOn(logoutUseCase, 'execute').mockResolvedValue(mockError);

      actions$.pipe(ofActionDispatched(Navigate)).subscribe(() => {
        done();
      });

      store.dispatch(new AuthStateLogoutAction()).subscribe(() => {
        const res = store.selectSnapshot(AuthStateSelectors.stateModel);

        expect(logoutUseCase.execute).toHaveBeenCalledTimes(1);
        expect(res).toEqual(expectedStateModel);
      });
    });
  });
});
