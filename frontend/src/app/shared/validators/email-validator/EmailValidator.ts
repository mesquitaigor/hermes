import { AbstractControl } from '@angular/forms';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { EmailErrorsKeys } from './EmailErrorsKeys';
import { validatorResult } from '@validators/validatorResult';
import AuthService from '../../auth/auth.service';
import { AuthDto } from '../../auth/AuthDto';
import { HttpErrorResponse } from '@angular/common/http';
type emailErrors = validatorResult<typeof EmailErrorsKeys>;
export default class EmailValidator {
  static format(control: AbstractControl): emailErrors {
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
  ): (control: AbstractControl) => Observable<emailErrors> {
    return EmailValidator.checkEmail(authService, true);
  }
  static nonExisting(
    authService: AuthService
  ): (control: AbstractControl) => Observable<emailErrors> {
    return EmailValidator.checkEmail(authService, false);
  }

  private static checkEmail(
    authService: AuthService,
    shouldExist: boolean
  ): (control: AbstractControl) => Observable<emailErrors> {
    return (control: AbstractControl): Observable<emailErrors> => {
      return authService.validateEmail(control.value).pipe(
        delay(500),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catchError((error: any) => {
          console.log(error);
          return of(error);
        }),
        map((res: AuthDto.EmailAvailabilityResponse) => {
          if (typeof res?.existing === 'boolean') {
            if (shouldExist && res.existing) {
              return { existing: true };
            } else if (!shouldExist && !res.existing) {
              return { nonexisting: true };
            }
          }
          return null;
        })
      );
    };
  }
}
