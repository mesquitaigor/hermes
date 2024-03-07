import { AbstractControl } from '@angular/forms';
import { Observable, catchError, delay, map, of } from 'rxjs';
import AuthService from '../../auth/auth.service';
import { AuthDto } from '../../auth/AuthDto';
import { IEmailValidator } from './IEmailValidator';
import { HttpErrorResponse } from '@angular/common/http';

export default class EmailValidator {
  static format(control: AbstractControl): IEmailValidator.errors {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (control.value?.match(validRegex)) {
      return null;
    } else {
      return {
        invalidFormat: true,
      };
    }
  }
  static existing(
    authService: AuthService
  ): (control: AbstractControl) => Observable<IEmailValidator.errors> {
    const validator = new EmailValidator();
    return validator.checkEmail(authService, true);
  }
  static nonExisting(
    authService: AuthService
  ): (control: AbstractControl) => Observable<IEmailValidator.errors> {
    const validator = new EmailValidator();
    return validator.checkEmail(authService, false);
  }

  private checkEmail(
    authService: AuthService,
    shouldExist: boolean
  ): (control: AbstractControl) => Observable<IEmailValidator.errors> {
    return (control: AbstractControl): Observable<IEmailValidator.errors> => {
      return authService.validateEmail(control.value).pipe(
        delay(200),
        catchError((error: HttpErrorResponse) => {
          return of(error);
        }),
        map((res: AuthDto.EmailValidateResponse | HttpErrorResponse) => {
          return this.prepareCheckEmailResult(shouldExist, res);
        })
      );
    };
  }

  private prepareCheckEmailResult(
    shouldExist: boolean,
    res: AuthDto.EmailValidateResponse | HttpErrorResponse
  ): IEmailValidator.errors {
    if (!(res instanceof HttpErrorResponse)) {
      if (typeof res.existing === 'boolean') {
        if (shouldExist && res.existing) {
          return { existing: true };
        } else if (!shouldExist && !res.existing) {
          return { nonexisting: true };
        }
      }
    } else {
      return { validatorHttpError: true };
    }
    return null;
  }
}
