import { Module } from '@nestjs/common';
import { ManageUserController } from './endpoints/manage-users/manage.user.controller';
import { ManageUsersFeatureModule } from './features/manage-users/manage.users.feature.module';

@Module({
  imports: [ManageUsersFeatureModule],
  controllers: [ManageUserController],
  providers: [],
})
export class AppModule {}
