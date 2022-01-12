import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { LoginAction } from './auth.state.actions';
import { AuthStateModel, defaultAuthStateModel } from './auth.state.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaultAuthStateModel,
})
@Injectable()
export class AuthState {
  @Action(LoginAction)
  login({ dispatch, patchState }: StateContext<AuthStateModel>) {
    //TODO feature anbinden
    patchState({ token: '123' });
    dispatch(new Navigate(['home']));
  }
}
