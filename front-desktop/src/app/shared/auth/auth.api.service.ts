import { Injectable } from '@angular/core';
import { AuthDto } from './AuthDto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export default class AuthApiService {
  constructor(private httpClient: HttpClient) {}
  validateEmail(
    payload: AuthDto.EmailValidatePayload
  ): Observable<AuthDto.EmailValidateResponse> {
    return this.httpClient.get<AuthDto.EmailValidateResponse>(
      '/validate-email',
      {
        params: new HttpParams({
          fromObject: { email: payload.email },
        }),
      }
    );
  }
  register(
    payload: AuthDto.RegisterPayload
  ): Observable<AuthDto.RegisterResponse> {
    return this.httpClient.post<AuthDto.RegisterResponse>('/register', payload);
  }
  authenticate(
    payload: AuthDto.AuthenticatePayload
  ): Observable<AuthDto.AuthenticateResponse> {
    return this.httpClient.post<AuthDto.AuthenticateResponse>(
      '/authenticate',
      payload
    );
  }
}
