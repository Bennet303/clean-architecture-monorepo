import { Module } from '@nestjs/common';
import { ManageUserController } from './endpoints/manage-users/manage.user.controller';

@Module({
  imports: [],
  controllers: [ManageUserController],
  providers: [],
})
export class AppModule {}
