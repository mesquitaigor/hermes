import { Component, HostBinding } from '@angular/core';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';
import UserService from '@users/user.service';
import BasicUser from '@users/model/BasicUser';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent {
  @HostBinding('class.sending') sending = false;
  constructor(
    private userService: UserService,
    private loginPageService: LoginPageService
  ) {}

  handleSendRegister(): void {
    const registerForm = this.loginPageService.registerForm;
    if (registerForm) {
      const subscription = registerForm.statusChanges.subscribe(() => {
        if (registerForm?.valid && !this.sending) {
          console.log('oi');
          this.sending = true;
          const newUser = this.getUserFromForm();
          if (newUser) {
            this.userService.createUser(newUser).subscribe(() => {
              this.sending = false;
              subscription.unsubscribe();
            });
          }
        }
      });
      this.updateInput(RegisterFormInputNames.FIRST_NAME, registerForm);
      this.updateInput(RegisterFormInputNames.LAST_NAME, registerForm);
      this.updateInput(RegisterFormInputNames.PASSWORD, registerForm);
      this.updateInput(
        RegisterFormInputNames.PASSWORD_CONFIRMATION,
        registerForm
      );
      registerForm.markAllAsTouched();
      registerForm.updateValueAndValidity();
    }
  }

  updateInput(
    inputName: RegisterFormInputNames,
    registerForm: FormGroup
  ): void {
    registerForm.get(inputName)?.markAsTouched();
    registerForm.get(inputName)?.updateValueAndValidity();
  }

  getUserFromForm(): BasicUser | void {
    const formValues = this.loginPageService.registerForm?.value;
    if (formValues) {
      return new BasicUser({
        email: formValues[RegisterFormInputNames.EMAIL],
        firstName: formValues[RegisterFormInputNames.FIRST_NAME],
        lastName: formValues[RegisterFormInputNames.LAST_NAME],
        password: formValues[RegisterFormInputNames.PASSWORD],
      });
    }
  }

  handleBack(): void {
    this.loginPageService.displayInitialContent();
  }
}
