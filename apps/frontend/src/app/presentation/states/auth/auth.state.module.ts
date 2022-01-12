import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthFeatureModule } from '../../../features/auth/auth.feature.module';
import { AuthState } from './auth.state';

@NgModule({
  imports: [NgxsModule.forFeature([AuthState]), AuthFeatureModule],
})
export class AuthStateModule {}
