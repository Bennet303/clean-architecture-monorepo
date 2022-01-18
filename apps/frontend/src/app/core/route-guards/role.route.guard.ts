import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from '../../presentation/states/auth/auth.state.selectors';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RoleRouteGuard implements CanActivate, CanLoad {
  constructor(private readonly store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const acceptedRoles: Array<RolesEnum> = route.data.acceptedRoles || [];
    return this.isRoleAccepted(acceptedRoles);
  }

  canLoad(route: Route): boolean {
    const acceptedRoles: Array<RolesEnum> = route.data?.acceptedRoles || [];
    return this.isRoleAccepted(acceptedRoles);
  }

  private isRoleAccepted(acceptedRoles: Array<RolesEnum>): boolean {
    const userRole = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).role;

    if (
      userRole &&
      acceptedRoles.length > 0 &&
      acceptedRoles.includes(userRole)
    ) {
      return true;
    }
    //? Maybe navigate to some 'Permission Denied Page' in the future
    return false;
  }
}
