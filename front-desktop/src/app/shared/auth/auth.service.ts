import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BasicUser from '../../domains/users/model/BasicUser';
import { AuthDto } from './AuthDto';
import AuthApiService from './auth.api.service';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private authApiService: AuthApiService) {}

  register(newUser: BasicUser): Observable<AuthDto.RegisterResponse> {
    return this.authApiService.register({
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: newUser.password,
    });
  }

  validateEmail(email: string): Observable<AuthDto.EmailValidateResponse> {
    return this.authApiService.validateEmail({ email });
  }

  login(
    email: string,
    password: string
  ): Observable<AuthDto.AuthenticateResponse> {
    return this.authApiService.authenticate({ email, password });
  }
}
