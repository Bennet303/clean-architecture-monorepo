import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  catchError,
  Observable,
  Subject,
  throttleTime,
  throwError,
  timeout,
  TimeoutError,
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

    return next
      .handle(request)
      .pipe(catchError(this.handleHttpErrorResponse))
      .pipe(timeout(30000), catchError(this.handleErrors));
  }

  private handleHttpErrorResponse = (
    error: HttpErrorResponse,
    caughtRequest$: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> => {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.throttledLogout.next();
    } else if (error.status === 0) {
      return caughtRequest$;
    }
    return throwError(() => error); // throw error back to the handler so that the data source throws the error to the repository
  };

  private handleErrors = (error: unknown): Observable<HttpEvent<unknown>> => {
    if (error instanceof TimeoutError) {
      // handle timeout error here
    }
    return throwError(() => error);
  };
}
