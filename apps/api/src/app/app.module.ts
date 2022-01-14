import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageUsersController } from './endpoints/manage-users/manage.users.controller';
import { ManageUsersFeatureModule } from './features/manage-users/manage.users.feature.module';

@Module({
  imports: [ManageUsersFeatureModule],
  controllers: [AppController, ManageUsersController],
  providers: [],
})
export class AppModule {}
