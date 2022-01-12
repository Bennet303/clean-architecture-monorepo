import { Selector } from '@ngxs/store';
import { AuthState } from './auth.state';
import { AuthStateModel } from './auth.state.model';

export abstract class AuthStateSelectors {
  @Selector([AuthState])
  static token({ token }: AuthStateModel) {
    return token;
  }
}
