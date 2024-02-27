import { AbstractControl } from '@angular/forms';
import UserService from '@users/user.service';
import { Observable, map } from 'rxjs';
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
  static existing(userService: UserService) {
    return (control: AbstractControl): Observable<emailErrors> => {
      return userService.checkEmailAvailability(control.value).pipe(
        map((res: { existing: boolean; user: number }) => {
          if (res.existing) {
            return { existing: true };
          }
          return null;
        })
      );
    };
  }
}
