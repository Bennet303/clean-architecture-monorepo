import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageUsersController } from './endpoints/manage-users/manage.users.controller';
import { ManageUsersFeatureModule } from './features/manage-users/manage.users.feature.module';
import { ThrottlingModule } from './throttling.module';

@Module({
  imports: [ManageUsersFeatureModule, ThrottlingModule],
  controllers: [AppController, ManageUsersController],
})
export class AppModule {}
