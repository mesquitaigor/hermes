import { AbstractControl } from '@angular/forms';
import UserService from '@users/user.service';
import { Observable, map } from 'rxjs';
import { emailErrors } from 'src/app/shared/validators/emailErrors';
import { validatorReturn } from 'src/app/shared/validators/passwordValidationReturn';

export default class EmailValidator {
  static format(control: AbstractControl): validatorReturn<typeof emailErrors> {
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
    return (
      control: AbstractControl
    ): Observable<validatorReturn<typeof emailErrors>> => {
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
