import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ManageUsersFeatureModule } from '../../../features/manage-users/manage.users.feature.module';
import { HomePageState } from './home.page.state';

@NgModule({
  imports: [NgxsModule.forFeature([HomePageState]), ManageUsersFeatureModule],
})
export class HomePageStateModule {}
