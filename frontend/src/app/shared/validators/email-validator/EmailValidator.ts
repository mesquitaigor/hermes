import { AbstractControl } from '@angular/forms';
import UserService from '@users/user.service';
import { Observable, delay, map } from 'rxjs';
import { EmailErrorsKeys } from './EmailErrorsKeys';
import { validatorResult } from '@validators/validatorResult';
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
    userService: UserService
  ): (control: AbstractControl) => Observable<emailErrors> {
    return EmailValidator.checkEmail(userService, true);
  }
  static nonExisting(
    userService: UserService
  ): (control: AbstractControl) => Observable<emailErrors> {
    return EmailValidator.checkEmail(userService, false);
  }

  private static checkEmail(
    userService: UserService,
    shouldExist: boolean
  ): (control: AbstractControl) => Observable<emailErrors> {
    return (control: AbstractControl): Observable<emailErrors> => {
      return userService.checkEmailAvailability(control.value).pipe(
        delay(500),
        map((res: { existing: boolean; user: number }) => {
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
