import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BackendManageUsersDataSource } from './data-sources/backend.manage.users.data.source';
import { ManageUsersDataSource } from './data-sources/manage.users.data.source';
import { MockManageUsersDataSource } from './data-sources/mock.manage.users.data.source';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { ManageUsersRepositoryImpl } from './repositories/manage.users.repository.impl';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
import { GetUserUseCase } from './use-cases/get.user.use.case';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: ManageUsersDataSource,
      useFactory: (httpClient: HttpClient) => {
        if (environment.backendUrl) {
          return new BackendManageUsersDataSource(httpClient);
        }
        return new MockManageUsersDataSource();
      },
    },
    {
      provide: ManageUsersRepository,
      useClass: ManageUsersRepositoryImpl,
    },
    GetUserUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class ManageUsersFeatureModule {}
