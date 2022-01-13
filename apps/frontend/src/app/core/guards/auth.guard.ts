import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from '../../presentation/states/auth/auth.state.selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly store: Store) {}

  canActivate(): boolean {
    return this.isTokenValid();
  }

  canLoad(): boolean {
    if (this.isTokenValid()) {
      return true;
    }
    this.store.dispatch(new Navigate(['login']));
    return false;
  }

  private isTokenValid(): boolean {
    const token = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).token;

    if (token) {
      return true;
    }
    return false;
  }
}
