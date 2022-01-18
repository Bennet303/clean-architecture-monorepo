import { NgModule } from '@angular/core';
import { AuthStateModule } from '../../presentation/states/auth/auth.state.module';
import { AuthRouteGuard } from './auth.route.guard';
import { RoleRouteGuard } from './role.route.guard';

@NgModule({
  imports: [AuthStateModule],
  providers: [RoleRouteGuard, AuthRouteGuard],
})
export class RouteGuardsModule {}
