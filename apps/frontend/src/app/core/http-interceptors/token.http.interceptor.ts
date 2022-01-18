import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  catchError,
  Observable,
  Subject,
  throttleTime,
  throwError,
} from 'rxjs';
import { AuthStateLogoutAction } from '../../presentation/states/auth/auth.state.actions';
import { UnauthorizedError } from '../../presentation/states/auth/auth.state.errors';
import { AuthStateSelectors } from '../../presentation/states/auth/auth.state.selectors';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {
  private readonly throttledLogout = new Subject<void>();

  constructor(private readonly store: Store) {
    // Only logs out the user once every 3 seconds.
    // So that if multiple http request get a 401 response this will not be called multiple times.
    this.throttledLogout
      .pipe(throttleTime(3000))
      .subscribe(() =>
        this.store.dispatch(new AuthStateLogoutAction(new UnauthorizedError()))
      );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).token;

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true, when using backend session
    });

    return next.handle(request).pipe(catchError(this.handleHttpError));
    // .pipe(timeout(30000), catchError(this.handleTimeoutError)); // when explicitly wanting to catch custom timeout error
  }

  private handleHttpError = (
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> => {
    if (error.status === 401) {
      this.throttledLogout.next();
    }
    return throwError(() => error); // throw error back to the handler so that the data source throws the error to the repository
  };

  //! only necessary for custom handling timeout error
  // private handleTimeoutError = (
  //   error: unknown,
  //   caughtReq$: Observable<HttpEvent<unknown>>
  // ): Observable<HttpEvent<unknown>> => {
  //   if (error instanceof TimeoutError) {
  //     // handle timeout error here
  //     return throwError(() => error); // throw TimeoutError if there is no response after 30 seconds
  //   }
  //   return caughtReq$; //retry sending the request to the backend until receiving a response
  // };
}
