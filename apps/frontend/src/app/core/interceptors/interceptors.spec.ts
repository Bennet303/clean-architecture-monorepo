/* eslint-disable jest/no-done-callback */
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthState } from '../../presentation/states/auth/auth.state';
import { AuthStateLogoutAction } from '../../presentation/states/auth/auth.state.actions';
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
  let actions$: Actions;
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
    actions$ = TestBed.inject(Actions);
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
  });
  describe('failure', () => {
    it(`should call the state to log out the user if the http response is ${HttpStatusCode.Unauthorized}`, (done) => {
      const mockToken = '123';
      store.reset({
        ...store.snapshot(),
        auth: {
          ...defaultAuthStateModel,
          token: mockToken,
        } as AuthStateModel,
      });

      actions$.pipe(ofActionDispatched(AuthStateLogoutAction)).subscribe(() => {
        done();
      });

      let res: unknown;
      let error: unknown;
      httpClient.get(environment.backendUrl).subscribe({
        next: (response) => {
          res = response;
        },
        error: (err) => {
          error = err;
        },
      });

      const req = httpMock.expectOne(environment.backendUrl);
      req.flush({}, { status: HttpStatusCode.Unauthorized, statusText: '' });

      expect(res).toBeUndefined();
      expect(error).toBeInstanceOf(HttpErrorResponse);
      expect((error as HttpErrorResponse).status).toBe(
        HttpStatusCode.Unauthorized
      );
    });
    it(`should throw the error back to the caller if any other http error occurs (e.g. 404)`, () => {
      const mockToken = '123';
      store.reset({
        ...store.snapshot(),
        auth: {
          ...defaultAuthStateModel,
          token: mockToken,
        } as AuthStateModel,
      });

      let res: unknown;
      let error: unknown;
      httpClient.get(environment.backendUrl).subscribe({
        next: (response) => {
          res = response;
        },
        error: (err) => {
          error = err;
        },
      });

      const req = httpMock.expectOne(environment.backendUrl);
      req.flush({}, { status: HttpStatusCode.NotFound, statusText: '' });

      expect(res).toBeUndefined();
      expect(error).toBeInstanceOf(HttpErrorResponse);
      expect((error as HttpErrorResponse).status).toBe(HttpStatusCode.NotFound);
    });
    it(`should throw the error back to the caller if any other network failure occurs`, () => {
      const mockToken = '123';
      store.reset({
        ...store.snapshot(),
        auth: {
          ...defaultAuthStateModel,
          token: mockToken,
        } as AuthStateModel,
      });

      let res: unknown;
      let error: unknown;
      httpClient.get(environment.backendUrl).subscribe({
        next: (response) => {
          res = response;
        },
        error: (err) => {
          error = err;
        },
      });

      const req = httpMock.expectOne(environment.backendUrl);
      req.error(new ErrorEvent('error'));

      expect(res).toBeUndefined();
      expect(error).toBeInstanceOf(HttpErrorResponse);
      expect((error as HttpErrorResponse).status).toBe(0);
    });
  });
});
