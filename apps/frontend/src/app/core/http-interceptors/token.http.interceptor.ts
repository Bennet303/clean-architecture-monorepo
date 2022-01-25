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
  concatMap,
  delay,
  Observable,
  of,
  retryWhen,
  Subject,
  throttleTime,
  throwError,
} from 'rxjs';
import { AuthStateLogoutAction } from '../../presentation/states/auth/auth.state.actions';
import { UnauthorizedError } from '../../presentation/states/auth/auth.state.errors';
import { AuthStateSelectors } from '../../presentation/states/auth/auth.state.selectors';
import { TimeoutError } from '../abstracts/errors';

export const retryCount = 20;
export const retryWaitMilliseconds = 1000;

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

    return next.handle(request).pipe(
      retryWhen((error) =>
        error.pipe(
          concatMap((error, count) => {
            if (count === retryCount) {
              return throwError(() => new TimeoutError()); // abort request with timeout error
            }
            if (error instanceof HttpErrorResponse) {
              switch (error.status) {
                case 0:
                  return of(error); // retry request when backend cannot be reached
                case HttpStatusCode.Unauthorized:
                  this.throttledLogout.next(); // log out
                  break;
              }
            }
            return throwError(() => error); // abort request with error
          }),
          delay(retryWaitMilliseconds) // delay retried requests
        )
      )
    );
  }
}
