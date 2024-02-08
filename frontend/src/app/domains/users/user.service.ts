import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(newUser: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return this.httpClient.post('http://localhost:3500/users', newUser);
  }
}
