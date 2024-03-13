import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import AuthService from './auth.service';

export default class JwtHttpInterceptor {
  authService = inject(AuthService);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Append default headers
    let headers = request.headers
      .set('Accept', `application/json`)
      .set('Content-Type', `application/json`)
      .set('version', environment.version);

    //Append JWT Token if exists
    if (this.authService.isAuthenticated()) {
      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
    }

    //Override API URL if header exists
    let api_url = headers.has('override-api-url')
      ? headers.get('override-api-url')
      : environment.api;

    return next
      .handle(
        request.clone({
          headers: headers,
          url: `${api_url}${request.url}`,
        })
      )
      .pipe(
        tap({
          next: (ev: HttpEvent<unknown>) => {
            if (ev instanceof HttpResponse) {
              //HTTP Response
            }
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              if (!headers.has('override-api-url')) {
                /* this.userService.fireUnauthorized() */
              }
            }
          },
        })
      );
  }
}
