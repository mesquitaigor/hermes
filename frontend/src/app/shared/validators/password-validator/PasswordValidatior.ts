import { AbstractControl } from '@angular/forms';
import { PasswordErrors } from '@validators/password-validator/PasswordErrors';
import { validatorResult } from '@validators/validatorResult';
export default class PasswordValidator {
  static passwordConfirmationIsEqual(
    control: AbstractControl
  ): validatorResult<typeof PasswordErrors> {
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
  ): validatorResult<typeof PasswordErrors> {
    if (!/\d/.test(control.value)) {
      return { shouldHaveNumbers: true };
    } else {
      return null;
    }
  }

  static shouldHaveLowerLetters(
    control: AbstractControl
  ): validatorResult<typeof PasswordErrors> {
    if (!/[a-z]/.test(control.value)) {
      return { shouldHaveLowerLetters: true };
    } else {
      return null;
    }
  }

  static shouldHaveUpperLetters(
    control: AbstractControl
  ): validatorResult<typeof PasswordErrors> {
    if (!/[A-Z]/.test(control.value)) {
      return { shouldHaveUpperLetters: true };
    } else {
      return null;
    }
  }

  static shouldHavespecialCharacters(
    control: AbstractControl
  ): validatorResult<typeof PasswordErrors> {
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value)) {
      return { shouldHavespecialCharacters: true };
    } else {
      return null;
    }
  }
}
