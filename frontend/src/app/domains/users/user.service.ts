import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BasicUser from '@users/model/BasicUser';
import { Observable } from 'rxjs';
import EmailAvailabilityResponse from './dto/EmailAvailabilityResponse';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
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
