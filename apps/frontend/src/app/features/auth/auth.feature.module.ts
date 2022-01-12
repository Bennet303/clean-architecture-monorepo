import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthDataSource } from './data-sources/auth.data.source';
import { MockAuthDataSource } from './data-sources/mock.auth.data.source';
import { AuthRepository } from './repositories/auth.repository';
import { AuthRepositoryImpl } from './repositories/auth.repository.impl';
import { LoginUseCase } from './use-cases/login.use.case';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: AuthDataSource,
      useFactory: () => {
        if (environment.backendUrl) {
          return new MockAuthDataSource();
        }
        return new MockAuthDataSource();
      },
    },
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    LoginUseCase,
  ],
})
export class AuthFeatureModule {}
