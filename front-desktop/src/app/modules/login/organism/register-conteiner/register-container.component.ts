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
import { IRegisterContainer } from './IRegisterContainer';
import { ILoginPage } from '../../resources/ILoginPage';

@Component({
  selector: 'register-container',
  templateUrl: 'register-container.component.html',
  styleUrls: ['register-container.component.scss'],
})
export default class RegisterContainerComponent implements OnInit {
  @Input() contFormGroup?: FormGroup;
  @Input() contentObservable?: BehaviorSubject<ILoginPage.LoginPageEvents>;
  @Output() formReady = new EventEmitter<IRegisterContainer.OutReady>();
  @HostBinding('class.sending') sending = false;
  inputs: IRegisterContainer.inputsControl = {};
  constructor(
    private authServce: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formReady.emit({
      addControls: (formGroup: FormGroup): void => {
        this.forEachInput(
          (inputItem: IRegisterContainer.InputsControlValue) => {
            const abstractControl = inputItem.control.getNgControl();
            if (abstractControl) {
              formGroup.addControl(inputItem.name, abstractControl);
            }
          }
        );
      },
      removeControls: (formGroup: FormGroup): void => {
        this.forEachInput(
          (inputItem: IRegisterContainer.InputsControlValue) => {
            formGroup.removeControl(inputItem.name);
          }
        );
      },
    });
  }

  forEachInput(
    cb: (item: IRegisterContainer.InputsControlValue) => void
  ): void {
    Object.keys(this.inputs).forEach((key) => {
      const inputItem =
        this.inputs[key as keyof IRegisterContainer.inputsControl];
      if (inputItem) {
        cb(inputItem);
      }
    });
  }

  handleRecoverPasswordInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        ILoginPage.InputNames.PASSWORD,
        abstractControl
      );
      this.inputs.password = {
        control: hmsControl,
        name: ILoginPage.InputNames.PASSWORD,
      };
    }
  }

  handleRecoverPasswordConfirmationInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        ILoginPage.InputNames.PASSWORD,
        abstractControl
      );
      this.inputs.passwordConfirmation = {
        control: hmsControl,
        name: ILoginPage.InputNames.PASSWORD_CONFIRMATION,
      };
    }
  }

  handleRecoverFirstnameInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        ILoginPage.InputNames.FIRST_NAME,
        abstractControl
      );
      this.inputs.firstName = {
        control: hmsControl,
        name: ILoginPage.InputNames.FIRST_NAME,
      };
    }
  }

  handleRecoverLastnameInput(hmsControl: HmsInputControll): void {
    const abstractControl = hmsControl.getNgControl();
    if (this.contFormGroup && abstractControl) {
      this.contFormGroup.addControl(
        ILoginPage.InputNames.LAST_NAME,
        abstractControl
      );
      this.inputs.lastName = {
        control: hmsControl,
        name: ILoginPage.InputNames.LAST_NAME,
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
        ILoginPage.InputNames.FIRST_NAME,
        this.contFormGroup
      );
      this.updateInput(
        ILoginPage.InputNames.LAST_NAME,
        this.contFormGroup
      );
      this.updateInput(
        ILoginPage.InputNames.PASSWORD,
        this.contFormGroup
      );
      this.updateInput(
        ILoginPage.InputNames.PASSWORD_CONFIRMATION,
        this.contFormGroup
      );
      this.contFormGroup.markAllAsTouched();
      this.contFormGroup.updateValueAndValidity();
    }
  }

  updateInput(
    inputName: ILoginPage.InputNames,
    registerForm: FormGroup
  ): void {
    registerForm.get(inputName)?.markAsTouched();
    registerForm.get(inputName)?.updateValueAndValidity();
  }

  getUserFromForm(): BasicUser | void {
    const formValues = this.contFormGroup?.value;
    if (formValues) {
      return new BasicUser({
        email: formValues[ILoginPage.InputNames.EMAIL],
        firstName: formValues[ILoginPage.InputNames.FIRST_NAME],
        lastName: formValues[ILoginPage.InputNames.LAST_NAME],
        password: formValues[ILoginPage.InputNames.PASSWORD],
      });
    }
  }

  handleBack(): void {
    this.contentObservable?.next({ displayContent: 'initial' });
  }
}
