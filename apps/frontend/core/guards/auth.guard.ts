import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from '../../src/app/presentation/states/auth/auth.state.selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly store: Store) {}

  canActivate(): boolean {
    const token = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).token;

    if (!token) {
      this.store.dispatch(new Navigate(['login']));
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    return this.canActivate();
  }
}
