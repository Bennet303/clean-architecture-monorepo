import { Location } from '@angular/common';
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
export class RoleGuard implements CanActivate, CanLoad {
  constructor(
    private readonly store: Store,
    private readonly location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const acceptedRoles: Array<RolesEnum> = route.data.acceptedRoles || [];
    return this.isRoleAccepted(acceptedRoles);
  }

  canLoad(route: Route): boolean {
    const acceptedRoles: Array<RolesEnum> = route.data?.acceptedRoles || [];
    if (this.isRoleAccepted(acceptedRoles)) {
      return true;
    }
    this.location.back(); //TODO Maybe navigate to some 'Permission Denied Page' in the future
    return false;
  }

  private isRoleAccepted(acceptedRoles: Array<RolesEnum>): boolean {
    const userRole = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).role;

    if (userRole && acceptedRoles.some((role) => role === userRole)) {
      return true;
    }
    return false;
  }
}
