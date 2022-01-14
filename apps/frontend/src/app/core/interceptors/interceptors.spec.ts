import {
  HttpClient,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthState } from '../../presentation/states/auth/auth.state';
import {
  AuthStateModel,
  defaultAuthStateModel,
} from '../../presentation/states/auth/auth.state.model';
import { AuthStateModule } from '../../presentation/states/auth/auth.state.module';
import { TokenInterceptor } from './token.interceptor';

describe('token interceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([AuthState]),
        AuthStateModule,
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(Store);
  });
  afterEach(() => {
    httpMock.verify();
  });
  describe('success', () => {
    it.each(['123', '', undefined, null])(
      'should set the authorization header',
      async (mockToken) => {
        store.reset({
          ...store.snapshot(),
          auth: {
            ...defaultAuthStateModel,
            token: mockToken,
          } as AuthStateModel,
        });
        const mockBody = { mockKey: 'mockValue' };

        const call = lastValueFrom(
          httpClient.post(environment.backendUrl, mockBody)
        );
        const req = httpMock.expectOne(environment.backendUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toStrictEqual(mockBody);
        expect(req.request.responseType).toBe('json');
        expect(req.request.headers.get('Authorization')).toBe(
          `Bearer ${mockToken}`
        );
        req.flush(mockBody, { status: HttpStatusCode.Ok, statusText: '' });

        const res = await call;
        expect(res).toStrictEqual(mockBody);
      }
    );
    //TODO restliche logikpfade testen! können im hinteren handleError andere error als timeout auftreten?
    //TODO kann time out im ersten error handling auftreten?
  });
});
