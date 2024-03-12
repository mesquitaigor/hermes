import { of, throwError } from 'rxjs';
import { AuthDto } from './../AuthDto';
import AuthService from './../auth.service';
import ServiceMock from '../../../test/ServiceMock.spec';
import { HttpErrorResponse } from '@angular/common/http';
export default class AuthServiceMock extends ServiceMock<AuthService> {
  emailExisting: AuthDto.EmailValidateResponse = { existing: false, user: 0 };
  checkEmailErrorResponse = false;

  build(): jasmine.SpyObj<AuthService> {
    const mockAuthService = this.createSpyObj(AuthService.name, [
      'validateEmail',
    ]);
    mockAuthService.validateEmail.and.callFake(() => {
      if (!this.checkEmailErrorResponse) {
        return of(this.emailExisting);
      } else {
        return throwError(() => new HttpErrorResponse({}));
      }
    });
    return mockAuthService;
  }
}
