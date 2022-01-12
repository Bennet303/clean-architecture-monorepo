import { TestBed } from '@angular/core/testing';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { AuthFeatureModule } from '../../../features/auth/auth.feature.module';
import { LoginResponseEntity } from '../../../features/auth/entities/login.response.entity';
import { LoginUseCase } from '../../../features/auth/use-cases/login.use.case';
import { AuthState } from './auth.state';
import { LoginAction } from './auth.state.actions';
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
    it('should write the token to the state', () => {
      return new Promise<void>((done) => {
        mockLoginResponse = new LoginResponseEntity({ token: '123' });
        expectedStateModel = {
          errorMessage: '',
          isLoading: false,
          token: mockLoginResponse.token,
        };
        jest
          .spyOn(loginUseCase, 'execute')
          .mockResolvedValue(mockLoginResponse);

        store.dispatch(new LoginAction());

        actions$.pipe(ofActionDispatched(Navigate)).subscribe(() => {
          const res = store.selectSnapshot(AuthStateSelectors.stateModel);

          expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
          expect(res).toEqual(expectedStateModel);

          done();
        });
      });
    });
    it('should write the error to the state', async () => {
      const mockError = new TranslatableError();
      expectedStateModel = {
        errorMessage: mockError.message,
        isLoading: false,
        token: '',
      };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(mockError);

      await lastValueFrom(store.dispatch(new LoginAction()));
      const res = store.selectSnapshot(AuthStateSelectors.stateModel);

      expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
      expect(res).toEqual(expectedStateModel);
    });
  });
});
