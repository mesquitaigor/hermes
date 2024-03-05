import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import BasicUser from '@users/model/BasicUser';
import { FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { BehaviorSubject, finalize } from 'rxjs';
import ToastController from '@controllers/toast/toast.controller';
import AuthService from '../../../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterContainer } from './RegisterContainer';
import { ILoginPage } from '../../ILoginPage';

@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent implements OnInit {
  @Input() contFormGroup?: FormGroup;
  @Input() contentObservable?: BehaviorSubject<ILoginPage.LoginPageEvents>;
  @Output() formReady = new EventEmitter<RegisterContainer.OutReady>();
  @HostBinding('class.sending') sending = false;
  inputs: RegisterContainer.inputsControl = {};
  constructor(
    private authServce: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formReady.emit({
      addControls: (formGroup: FormGroup): void => {
        this.forEachInput((inputItem: RegisterContainer.InputsControlValue) => {
          const abstractControl = inputItem.control.getNgControl();
          if (abstractControl) {
            formGroup.addControl(inputItem.name, abstractControl);
          }
        });
      },
      removeControls: (formGroup: FormGroup): void => {
        this.forEachInput((inputItem: RegisterContainer.InputsControlValue) => {
          formGroup.removeControl(inputItem.name);
        });
      },
    });
  }

  forEachInput(cb: (item: RegisterContainer.InputsControlValue) => void): void {
    Object.keys(this.inputs).forEach((key) => {
      const inputItem =
        this.inputs[key as keyof RegisterContainer.inputsControl];
      if (inputItem) {
        cb(inputItem);
      }
    });
  }

  handleRecoverPasswordInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        RegisterContainer.FormInputNames.PASSWORD,
        abstractControl
      );
      this.inputs.password = {
        control: hmsControl,
        name: RegisterContainer.FormInputNames.PASSWORD,
      };
    }
  }

  handleRecoverPasswordConfirmationInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        RegisterContainer.FormInputNames.PASSWORD,
        abstractControl
      );
      this.inputs.passwordConfirmation = {
        control: hmsControl,
        name: RegisterContainer.FormInputNames.PASSWORD_CONFIRMATION,
      };
    }
  }

  handleRecoverFirstnameInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        RegisterContainer.FormInputNames.FIRST_NAME,
        abstractControl
      );
      this.inputs.firstName = {
        control: hmsControl,
        name: RegisterContainer.FormInputNames.FIRST_NAME,
      };
    }
  }

  handleRecoverLastnameInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        RegisterContainer.FormInputNames.LAST_NAME,
        abstractControl
      );
      this.inputs.lastName = {
        control: hmsControl,
        name: RegisterContainer.FormInputNames.LAST_NAME,
      };
    }
  }

  handleSendRegister(): void {
    if (this.contFormGroup) {
      const subscription = this.contFormGroup.statusChanges.subscribe(() => {
        if (this.contFormGroup?.valid && !this.sending) {
          this.sending = true;
          const newUser = this.getUserFromForm();
          if (newUser) {
            this.authServce
              .register(newUser)
              .pipe(
                finalize(() => {
                  subscription.unsubscribe();
                  this.sending = false;
                })
              )
              .subscribe({
                next: () => {
                  this.toastController.success('Conta criada!');
                  this.router.navigate(['/home']);
                },
                error: () => {
                  this.toastController.error(
                    'Erro ao tentar registrar sua conta.'
                  );
                },
              });
          } else {
            subscription.unsubscribe();
            this.sending = false;
          }
        } else {
          subscription.unsubscribe();
        }
      });
      this.updateInput(
        RegisterContainer.FormInputNames.FIRST_NAME,
        this.contFormGroup
      );
      this.updateInput(
        RegisterContainer.FormInputNames.LAST_NAME,
        this.contFormGroup
      );
      this.updateInput(
        RegisterContainer.FormInputNames.PASSWORD,
        this.contFormGroup
      );
      this.updateInput(
        RegisterContainer.FormInputNames.PASSWORD_CONFIRMATION,
        this.contFormGroup
      );
      this.contFormGroup.markAllAsTouched();
      this.contFormGroup.updateValueAndValidity();
    }
  }

  updateInput(
    inputName: RegisterContainer.FormInputNames,
    registerForm: FormGroup
  ): void {
    registerForm.get(inputName)?.markAsTouched();
    registerForm.get(inputName)?.updateValueAndValidity();
  }

  getUserFromForm(): BasicUser | void {
    const formValues = this.contFormGroup?.value;
    if (formValues) {
      return new BasicUser({
        email: formValues[RegisterContainer.FormInputNames.EMAIL],
        firstName: formValues[RegisterContainer.FormInputNames.FIRST_NAME],
        lastName: formValues[RegisterContainer.FormInputNames.LAST_NAME],
        password: formValues[RegisterContainer.FormInputNames.PASSWORD],
      });
    }
  }

  handleBack(): void {
    this.contentObservable?.next({ displayContent: 'initial' });
  }
}
