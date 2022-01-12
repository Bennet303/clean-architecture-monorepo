import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../states/auth/auth.state.actions';

@Component({
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(new LoginAction());
  }
}
