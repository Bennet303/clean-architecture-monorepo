import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageUsersController } from './endpoints/manage-users/manage.users.controller';
import { PostsController } from './endpoints/posts/posts.controller';
import { AuthFeatureModule } from './features/auth/auth.feature.module';
import { ManageUsersFeatureModule } from './features/manage-users/manage.users.feature.module';
import { PostsFeatureModule } from './features/posts/post.feature.module';
import { ThrottlingModule } from './throttling.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ManageUsersFeatureModule,
    PostsFeatureModule,
    ThrottlingModule,
    AuthFeatureModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.databaseHost,
      port: environment.databasePort,
      username: environment.databaseUsername,
      password: environment.databasePassword,
      database: environment.databaseName,
      entities: [],
      synchronize: !environment.production, // only use this for development
    }),
  ],
  controllers: [AppController, ManageUsersController, PostsController],
})
export class AppModule {}
