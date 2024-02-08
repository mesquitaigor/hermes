import { Component } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { take } from 'rxjs';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';
import UserService from '@users/user.service';

type registerContainerInputs =
  | 'firstName'
  | 'lastName'
  | 'password'
  | 'passwordConfirmation';
@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent {
  constructor(
    private userService: UserService,
    private loginPageService: LoginPageService
  ) {}

  /* ngOnInit() {
    this.formRegisterListenChanges();
  } */

  atualizeFormInputsStatus(status: FormControlStatus) {
    /* if (status == 'VALID') {
      this.errors.passwordConfirmation.index = -1;
      this.errors.firstName.index = -1;
      this.errors.lastName.index = -1;
    } else if (
      status == 'INVALID' &&
      this.loginPageService.registerForm?.touched
    ) {
      this.changeInputStatus(RegisterFormInputNames.FIRST_NAME, ['required']);
      this.changeInputStatus(RegisterFormInputNames.LAST_NAME, ['required']);
      if (
        !this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.errors?.[
          'required'
        ] &&
        !this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.errors?.[
          'required'
        ] &&
        this.loginPageService.registerForm?.errors?.['differentPasswords'] &&
        this.loginPageService.get(RegisterFormInputNames.PASSWORD)?.touched &&
        this.loginPageService.get(RegisterFormInputNames.PASSWORD_CONFIRMATION)
          ?.touched
      ) {
        this.errors.password.index = 1;
      } else {
        this.changeInputStatus(RegisterFormInputNames.LAST_NAME, [
          'required',
          '',
          'minLength',
          'weakPassword',
        ]);
        this.changeInputStatus(RegisterFormInputNames.PASSWORD_CONFIRMATION, [
          'required',
        ]);
      }
    } */
  }

  /* formRegisterListenChanges() {
    this.loginPageService.registerForm?.statusChanges.subscribe((status) => {
      this.atualizeFormInputsStatus(status);
    });
  } */

  /* changeInputStatus(inputName: RegisterFormInputNames, errorCases: string[]) {
    const controll = this.loginPageService.get(inputName);
    if (controll?.status == 'VALID') {
      this.errors[inputName].index = -1;
    } else if (
      controll?.status == 'INVALID' &&
      this.loginPageService.registerForm?.touched
    ) {
      let found = false;
      errorCases.forEach((errorCase, index) => {
        if (controll.errors?.[errorCase] && !found) {
          found = true;
          this.errors[inputName].index = index;
        }
      });
    }
  } */

  handleSendRegister() {
    const registerForm = this.loginPageService.registerForm;
    if (registerForm) {
      registerForm.statusChanges.pipe(take(1)).subscribe(() => {
        if (registerForm?.valid) {
          this.userService
            .createUser(this.getUserFromForm())
            .subscribe(() => {});
        }
      });
      registerForm.get(RegisterFormInputNames.FIRST_NAME)?.markAsTouched();
      registerForm
        .get(RegisterFormInputNames.FIRST_NAME)
        ?.updateValueAndValidity();
      registerForm.get(RegisterFormInputNames.LAST_NAME)?.markAsTouched();
      registerForm
        .get(RegisterFormInputNames.LAST_NAME)
        ?.updateValueAndValidity();
      registerForm.markAllAsTouched();
      registerForm.updateValueAndValidity();
    }
  }

  getUserFromForm() {
    return {
      email: this.loginPageService.get(RegisterFormInputNames.EMAIL)?.value,
      firstName: this.loginPageService.get(RegisterFormInputNames.FIRST_NAME)
        ?.value,
      lastName: this.loginPageService.get(RegisterFormInputNames.LAST_NAME)
        ?.value,
      password: this.loginPageService.get(RegisterFormInputNames.PASSWORD)
        ?.value,
    };
  }

  handleBack() {
    this.loginPageService.displayInitialContent();
  }
}
