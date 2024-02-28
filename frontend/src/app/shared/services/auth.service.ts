import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BasicUser from '../../domains/users/model/BasicUser';
import EmailAvailabilityResponse from '../../domains/users/dto/EmailAvailabilityResponse';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private httpClient: HttpClient) {}

  createUser(newUser: BasicUser): Observable<{}> {
    return this.httpClient.post('http://localhost:3500/users', newUser);
  }

  checkEmailAvailability(
    email: string
  ): Observable<{ existing: boolean; user: number }> {
    return this.httpClient.get<EmailAvailabilityResponse>(
      'http://localhost:3500/users/validate-email',
      { params: { email } }
    );
  }
}
