import { Component, HostBinding, OnInit } from '@angular/core';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';
import UserService from '@users/user.service';
import BasicUser from '@users/model/BasicUser';
import { FormGroup } from '@angular/forms';
import HmsInputControll from '../../../../shared/components/common/hms-input/resources/models/HmsInputControll';
import { finalize } from 'rxjs';
import ToastController from '@controllers/toast/toast.controller';

type registerContainerInputsControl = {
  [key in RegisterFormInputNames]?: RegisterContainerInputsControlValue;
};

interface RegisterContainerInputsControlValue {
  control: HmsInputControll;
  name: RegisterFormInputNames;
}

@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent implements OnInit {
  @HostBinding('class.sending') sending = false;
  inputs: registerContainerInputsControl = {};
  constructor(
    private userService: UserService,
    private loginPageService: LoginPageService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.loginPageService.$events.subscribe((next) => {
      if (next?.to == 'register') {
        const loginPageFormGroup = this.loginPageService.registerForm;
        this.forEachInput((inputItem: RegisterContainerInputsControlValue) => {
          if (loginPageFormGroup) {
            loginPageFormGroup.addControl(
              inputItem.name,
              inputItem.control.getNgControl()
            );
          }
        });
      } else if (next?.to == 'initial' && next.previus == 'register') {
        const loginPageFormGroup = this.loginPageService.registerForm;
        this.forEachInput((inputItem: RegisterContainerInputsControlValue) => {
          if (loginPageFormGroup) {
            loginPageFormGroup.removeControl(inputItem.name);
          }
        });
      }
    });
  }

  forEachInput(cb: (item: RegisterContainerInputsControlValue) => void): void {
    Object.keys(this.inputs).forEach((key) => {
      const inputItem =
        this.inputs[key as keyof registerContainerInputsControl];
      if (inputItem) {
        cb(inputItem);
      }
    });
  }

  handleRecoverPasswordInput(hmsControl: HmsInputControll): void {
    const loginPageFormGroup = this.loginPageService.registerForm;
    if (loginPageFormGroup) {
      loginPageFormGroup.addControl(
        RegisterFormInputNames.PASSWORD,
        hmsControl.getNgControl()
      );
      this.inputs.password = {
        control: hmsControl,
        name: RegisterFormInputNames.PASSWORD,
      };
    }
  }

  handleRecoverPasswordConfirmationInput(hmsControl: HmsInputControll): void {
    const loginPageFormGroup = this.loginPageService.registerForm;
    if (loginPageFormGroup) {
      loginPageFormGroup.addControl(
        RegisterFormInputNames.PASSWORD,
        hmsControl.getNgControl()
      );
      this.inputs.passwordConfirmation = {
        control: hmsControl,
        name: RegisterFormInputNames.PASSWORD_CONFIRMATION,
      };
    }
  }

  handleRecoverFirstnameInput(hmsControl: HmsInputControll): void {
    const loginPageFormGroup = this.loginPageService.registerForm;
    if (loginPageFormGroup) {
      loginPageFormGroup.addControl(
        RegisterFormInputNames.FIRST_NAME,
        hmsControl.getNgControl()
      );
      this.inputs.firstName = {
        control: hmsControl,
        name: RegisterFormInputNames.FIRST_NAME,
      };
    }
  }

  handleRecoverLastnameInput(hmsControl: HmsInputControll): void {
    const loginPageFormGroup = this.loginPageService.registerForm;
    if (loginPageFormGroup) {
      loginPageFormGroup.addControl(
        RegisterFormInputNames.LAST_NAME,
        hmsControl.getNgControl()
      );
      this.inputs.lastName = {
        control: hmsControl,
        name: RegisterFormInputNames.LAST_NAME,
      };
    }
  }

  handleSendRegister(): void {
    const registerForm = this.loginPageService.registerForm;
    if (registerForm) {
      const subscription = registerForm.statusChanges.subscribe(() => {
        if (registerForm?.valid && !this.sending) {
          this.sending = true;
          const newUser = this.getUserFromForm();
          if (newUser) {
            this.userService
              .createUser(newUser)
              .pipe(finalize(() => subscription.unsubscribe()))
              .subscribe({
                next: () => {
                  this.toastController.success('Usuário criado com sucesso.');
                },
                error: () => {
                  this.toastController.error('Erro ao criar usuário.');
                },
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
