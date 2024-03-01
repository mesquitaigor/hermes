import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export default class JwtHttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    alert('oi');
    //Append default headers
    let headers = request.headers
      .set('Accept', `application/json`)
      .set('Content-Type', `application/json`)
      .set('version', environment.version);

    //Append JWT Token if exists
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
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
