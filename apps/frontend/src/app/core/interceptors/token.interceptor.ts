import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { AuthStateLogoutAction } from '../../presentation/states/auth/auth.state.actions';
import { UnauthorizedError } from '../../presentation/states/auth/auth.state.errors';
import { AuthStateSelectors } from '../../presentation/states/auth/auth.state.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.store.selectSnapshot(
      AuthStateSelectors.stateModel
    ).token;

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true, when using backend session
    });

    return next
      .handle(req)
      .pipe(
        catchError((error, caughtReq$) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.store.dispatch(
                new AuthStateLogoutAction(new UnauthorizedError())
              );
              return throwError(() => error); // throw error after receiving 401 from the backend
            }
          }
          return caughtReq$; //retry sending the request to the backend until receiving a response
        })
      )
      .pipe(
        timeout(30000),
        catchError((error) => throwError(() => error)) // throw TimeoutError if there is no response after 30 seconds
      );
  }
}
