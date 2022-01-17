import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { TranslatableError } from '../../../core/abstracts/translatable.error';
import { LoginUseCase } from '../../../features/auth/use-cases/login.use.case';
import { LogoutUseCase } from '../../../features/auth/use-cases/logout.use.case';
import {
  AuthStateLoginAction,
  AuthStateLogoutAction,
} from './auth.state.actions';
import { AuthStateModel, defaultAuthStateModel } from './auth.state.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaultAuthStateModel,
})
@Injectable()
export class AuthState {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase
  ) {}

  @Action(AuthStateLoginAction)
  async login({ dispatch, patchState }: StateContext<AuthStateModel>) {
    patchState({ errorMessage: '', isLoading: true });

    const res = await this.loginUseCase.execute();

    if (res instanceof TranslatableError) {
      patchState({
        errorMessage: res.message,
        token: '',
        isLoading: false,
        role: undefined,
      });
      return;
    }

    patchState({ token: res.token, isLoading: false, role: res.role });
    dispatch(new Navigate(['/home']));
  }

  @Action(AuthStateLogoutAction)
  async logout(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { error }: AuthStateLogoutAction
  ) {
    patchState({
      errorMessage: error?.message || '',
      token: '',
      role: undefined,
    });

    dispatch(new Navigate(['/login']));

    const res = await this.logoutUseCase.execute();

    if (res instanceof TranslatableError) {
      patchState({ errorMessage: res.message });
    }
  }
}
