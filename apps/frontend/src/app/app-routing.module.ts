import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
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
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
