import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { LoginUseCase } from '../../../features/auth/use-cases/login.use.case';
import { AuthStateLoginAction } from './auth.state.actions';
import { AuthStateModel, defaultAuthStateModel } from './auth.state.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaultAuthStateModel,
})
@Injectable()
export class AuthState {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Action(AuthStateLoginAction)
  async login({ dispatch, patchState }: StateContext<AuthStateModel>) {
    patchState({ errorMessage: '', isLoading: true });

    const res = await this.loginUseCase.execute();

    if (res instanceof TranslatableError) {
      patchState({ errorMessage: res.message, token: '', isLoading: false });
      return;
    }

    patchState({ token: res.token, isLoading: false });
    dispatch(new Navigate(['home']));
  }
}
