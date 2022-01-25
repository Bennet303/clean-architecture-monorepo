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
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthState } from '../../presentation/states/auth/auth.state';
import { AuthStateLogoutAction } from '../../presentation/states/auth/auth.state.actions';
import { UnauthorizedError } from '../../presentation/states/auth/auth.state.errors';
import {
  AuthStateModel,
  defaultAuthStateModel,
} from '../../presentation/states/auth/auth.state.model';
import { AuthStateModule } from '../../presentation/states/auth/auth.state.module';
import { TimeoutError } from '../abstracts/errors';
import {
  retryCount,
  retryWaitMilliseconds,
  TokenHttpInterceptor,
} from './token.http.interceptor';
describe('interceptors', () => {
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
          {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenHttpInterceptor,
            multi: true,
          },
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
    });
    describe('failure', () => {
      it(`should call the state to log out the user if the http response is ${HttpStatusCode.Unauthorized}`, () => {
        jest.spyOn(store, 'dispatch');

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
        expect(store.dispatch).toHaveBeenCalledWith(
          new AuthStateLogoutAction(new UnauthorizedError())
        );
        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });
      it(`should throw the error back to the caller if any other http error occurs (e.g. 404)`, () => {
        jest.spyOn(store, 'dispatch');

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
        expect((error as HttpErrorResponse).status).toBe(
          HttpStatusCode.NotFound
        );
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      it(`should retry the request ${retryCount} times if any other network failure occurs and return a timeout error if there is still no response`, fakeAsync(() => {
        jest.spyOn(store, 'dispatch');

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

        for (let i = 0; i < retryCount + 1; i++) {
          const req = httpMock.expectOne(environment.backendUrl);
          req.error(new ErrorEvent('error'));
          tick(retryWaitMilliseconds);
        }

        expect(res).toBeUndefined();
        expect(error).toBeInstanceOf(TimeoutError);
        expect(store.dispatch).not.toHaveBeenCalled();
      }));
      it(`should retry the request ${retryCount} times if any other network failure occurs and return the response if successful`, fakeAsync(() => {
        const mockBody = { mockKey: 'mockValue' };

        jest.spyOn(store, 'dispatch');

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

        for (let i = 0; i < retryCount; i++) {
          const req = httpMock.expectOne(environment.backendUrl);
          req.error(new ErrorEvent('error'));
          tick(retryWaitMilliseconds);
        }
        const req = httpMock.expectOne(environment.backendUrl);
        req.flush(mockBody, { status: HttpStatusCode.Ok, statusText: '' });

        expect(error).toBeUndefined();
        expect(res).toBe(mockBody);

        expect(store.dispatch).not.toHaveBeenCalled();
      }));
    });
  });
});
