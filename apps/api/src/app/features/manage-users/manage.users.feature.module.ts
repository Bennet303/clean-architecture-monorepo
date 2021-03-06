import { Module } from '@nestjs/common';
import { environment } from '../../../../src/environments/environment';
import { ManageUsersRepository } from './repositories/manage.users.repository';
import { ManageUsersRepositoryImpl } from './repositories/manage.users.repository.impl';
import { ManageUsersService } from './services/manage.users.service';
import { MockManageUsersService } from './services/mock.manage.users.service';
import { CreateUserUseCase } from './use-cases/create.user.use.case';
import { DeleteUserUseCase } from './use-cases/delete.user.use.case';
import { GetUserUseCase } from './use-cases/get.user.use.case';

@Module({
  imports: [],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    { provide: ManageUsersRepository, useClass: ManageUsersRepositoryImpl },
    {
      provide: ManageUsersService,
      useFactory: () => {
        if (environment.useMockData) {
          return new MockManageUsersService();
        } else {
          return new MockManageUsersService(); // use real service here
        }
      },
    },
  ],
  exports: [CreateUserUseCase, DeleteUserUseCase, GetUserUseCase],
})
export class ManageUsersFeatureModule {}
