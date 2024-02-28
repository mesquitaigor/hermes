import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import UserService from '@users/user.service';
import BasicUser from '@users/model/BasicUser';
import { FormGroup } from '@angular/forms';
import HmsInputControll from '../../../../shared/components/common/hms-input/resources/models/HmsInputControll';
import { finalize } from 'rxjs';
import ToastController from '@controllers/toast/toast.controller';
import OutRegisterContainerReady from './resources/OutRegisterContainerReady';

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
  @Input() contFormGroup?: FormGroup;
  @Output() formReady = new EventEmitter<OutRegisterContainerReady>();
  @Output() displayBack = new EventEmitter<void>();
  @HostBinding('class.sending') sending = false;
  inputs: registerContainerInputsControl = {};
  constructor(
    private userService: UserService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.formReady.emit({
      addControls: (formGroup: FormGroup): void => {
        this.forEachInput((inputItem: RegisterContainerInputsControlValue) => {
          console.log(formGroup);
          formGroup.addControl(
            inputItem.name,
            inputItem.control.getNgControl()
          );
        });
      },
      removeControls: (formGroup: FormGroup): void => {
        this.forEachInput((inputItem: RegisterContainerInputsControlValue) => {
          formGroup.removeControl(inputItem.name);
        });
      },
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
    if (this.contFormGroup) {
      this.contFormGroup.addControl(
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
    if (this.contFormGroup) {
      this.contFormGroup.addControl(
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
    if (this.contFormGroup) {
      this.contFormGroup.addControl(
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
    if (this.contFormGroup) {
      this.contFormGroup.addControl(
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
    if (this.contFormGroup) {
      console.log(this.contFormGroup);
      const subscription = this.contFormGroup.statusChanges.subscribe(() => {
        if (this.contFormGroup?.valid && !this.sending) {
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
      this.updateInput(RegisterFormInputNames.FIRST_NAME, this.contFormGroup);
      this.updateInput(RegisterFormInputNames.LAST_NAME, this.contFormGroup);
      this.updateInput(RegisterFormInputNames.PASSWORD, this.contFormGroup);
      this.updateInput(
        RegisterFormInputNames.PASSWORD_CONFIRMATION,
        this.contFormGroup
      );
      this.contFormGroup.markAllAsTouched();
      this.contFormGroup.updateValueAndValidity();
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
    const formValues = this.contFormGroup?.value;
    console.log(formValues);
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
    this.displayBack.emit();
  }
}
