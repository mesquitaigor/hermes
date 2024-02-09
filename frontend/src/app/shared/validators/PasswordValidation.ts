import { AbstractControl } from '@angular/forms';
import { passwordErrors } from '@validators/passwordErrors';
import { validatorReturn } from '@validators/passwordValidationReturn';
export default class PasswordValidaton {
  static passwordConfirmationIsEqual(
    control: AbstractControl
  ): validatorReturn<typeof passwordErrors> {
    if (
      control.get('password')?.value !==
      control.get('passwordConfirmation')?.value
    ) {
      return { differentPasswords: true };
    } else {
      return null;
    }
  }

  static shouldHaveNumbers(
    control: AbstractControl
  ): validatorReturn<typeof passwordErrors> {
    if (!/\d/.test(control.value)) {
      return { shouldHaveNumbers: true };
    } else {
      return null;
    }
  }

  static shouldHaveLowerLetters(
    control: AbstractControl
  ): validatorReturn<typeof passwordErrors> {
    if (!/[a-z]/.test(control.value)) {
      return { shouldHaveLowerLetters: true };
    } else {
      return null;
    }
  }

  static shouldHaveUpperLetters(
    control: AbstractControl
  ): validatorReturn<typeof passwordErrors> {
    if (!/[A-Z]/.test(control.value)) {
      return { shouldHaveUpperLetters: true };
    } else {
      return null;
    }
  }

  static shouldHavespecialCharacters(
    control: AbstractControl
  ): validatorReturn<typeof passwordErrors> {
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)) {
      return { shouldHavespecialCharacters: true };
    } else {
      return null;
    }
  }
}
