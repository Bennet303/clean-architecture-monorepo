import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginAction } from '../../states/auth/auth.state.actions';
import { AuthStateModel } from '../../states/auth/auth.state.model';
import { AuthStateSelectors } from '../../states/auth/auth.state.selectors';

@Component({
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  @Select(AuthStateSelectors.stateModel)
  authStateModel$!: Observable<AuthStateModel>;
  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(new LoginAction());
  }
}
