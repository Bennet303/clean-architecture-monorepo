import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '@clean-architecture-monorepo/shared';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ManageUsersDataSource } from './manage.users.data.source';

@Injectable()
export class BackendManageUsersDataSource implements ManageUsersDataSource {
  readonly backendUrl = `${environment.backendUrl}/manage-users`;

  constructor(private readonly httpClient: HttpClient) {}

  createUser(user: UserEntity): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(`${this.backendUrl}/create`, user)
    );
  }

  deleteUser(user: UserEntity): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(`${this.backendUrl}/delete`, user)
    );
  }

  getUser(): Promise<UserEntity> {
    return lastValueFrom(
      this.httpClient.get<UserEntity>(`${this.backendUrl}/get`)
    );
  }
}
