import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import BasicUser from '../../domains/users/model/BasicUser';
import { AuthDto } from './AuthDto';
import AuthApiService from './auth.api.service';
import HmsStorageService from '../services/storage/hms-storage.service';
import { IHmsStorage } from '../services/storage/IHmsStorage';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  auth$ = new BehaviorSubject<null | {authenticated: boolean}>(null)
  constructor(private authApiService: AuthApiService, private hmsStorageService: HmsStorageService) {
    if(this.isAuthenticated()){
      this.auth$.next({authenticated: true})
    }
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken())
  }

  getToken(): IHmsStorage.storage[IHmsStorage.keys] | void {
    return this.hmsStorageService.get(IHmsStorage.keys.ACCESS_TOKEN)?.value;
  }

  authUser(token: string): void{
    this.hmsStorageService.set(IHmsStorage.keys.ACCESS_TOKEN, token);
  }

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
    return this.authApiService.authenticate({ email, password })
      .pipe(tap((res) => {
        if(res.access_token){
          this.auth$.next({authenticated: true});
          this.authUser(res.access_token)
        }
      }))
  }

  logout(): void{
    this.hmsStorageService.remove(IHmsStorage.keys.ACCESS_TOKEN);
    this.auth$.next({authenticated: false});
  }
}
