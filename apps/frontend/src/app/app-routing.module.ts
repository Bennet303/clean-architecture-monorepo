import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolesEnum } from './core/enums/roles.enum';
import { AuthRouteGuard } from './core/route-guards/auth.route.guard';
import { RoleRouteGuard } from './core/route-guards/role.route.guard';
import { RouteGuardsModule } from './core/route-guards/route.guards.module';

export const routes: Routes = [
  //! new routes need to be tested inside "route.guards.spec.ts"
  {
    path: 'login',
    loadChildren: () =>
      import('./presentation/pages/login/login.page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./presentation/pages/home/home.page.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [AuthRouteGuard, RoleRouteGuard],
    canLoad: [AuthRouteGuard, RoleRouteGuard],
    data: {
      acceptedRoles: [RolesEnum.User, RolesEnum.Admin],
    },
  },
  //! new routes need to be tested inside "route.guards.spec.ts"
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouteGuardsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
