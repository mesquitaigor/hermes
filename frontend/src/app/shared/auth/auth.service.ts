import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BasicUser from '../../domains/users/model/BasicUser';
import { AuthDto } from './AuthDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private httpClient: HttpClient) {}

  registerUser(newUser: BasicUser): Observable<{}> {
    return this.httpClient.post(environment.api + '/register', newUser);
  }

  validateEmail(email: string): Observable<AuthDto.EmailAvailabilityResponse> {
    return this.httpClient.get<AuthDto.EmailAvailabilityResponse>(
      environment.api + '/validate-email',
      { params: { email } }
    );
  }
}
