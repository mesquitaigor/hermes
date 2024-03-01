import { HttpClient } from '@angular/common/http';
import HttpParamsAdapter from './HttpParamsAdapter';

export default class ApiService {
  constructor(protected httpClient: HttpClient) {}
  get(
    payload: HttpParamsAdapter<unknown>
  ): Observable<AuthDto.EmailValidateResponse> {
    return this.httpClient.get<AuthDto.EmailValidateResponse>(
      '/validate-email',
      { params: payload.getHttpParams() }
    );
  }
}
