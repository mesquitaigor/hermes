import { Component, HostBinding, Input } from '@angular/core';
import { AsyncValidatorFn, FormControlStatus, FormGroup } from '@angular/forms';
import EmailValidator from '@validators/email-validator/EmailValidator';
import AuthService from '../../../../shared/auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ILoginPage } from './../../resources/ILoginPage';
import { IEmailValidator } from '@validators/email-validator/IEmailValidator';
import { IHmsInput } from '@components/common/hms-input/IHmsInput';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent {
  @Input() contFormGroup?: FormGroup;
  @Input() contentObservable?: BehaviorSubject<ILoginPage.LoginPageEvents>;
  @HostBinding('down') down = false
  emailHmsControl?: HmsInputControll;
  additionalValidators: Array<IHmsInput.Validator<AsyncValidatorFn>> = [
    {
      fn: EmailValidator.nonExisting(this.authService),
      key: IEmailValidator.errorKeys.nonexisting,
      message: 'Email não cadastrado.',
    },
    {
      fn: EmailValidator.existing(this.authService),
      keys: [
        {
          key: IEmailValidator.errorKeys.existing,
          message: 'Email já possui cadastro.',
        },
        {
          key: IEmailValidator.errorKeys.validatorHttpError,
          toast:
            'Tivemos um erro ao validar seu email, por favor tente novamente!',
        },
      ],
    },
  ];

  constructor(private authService: AuthService) {}

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    if (this.contentObservable) {
      this.contentObservable.subscribe((content) => {
        if (content.displayContent != 'initial' && this.emailHmsControl) {
          this.emailHmsControl.removeAsyncValidator(
            IEmailValidator.errorKeys.existing
          );
          this.emailHmsControl.removeAsyncValidator(
            IEmailValidator.errorKeys.nonexisting
          );
          this.down = true
        }
      });
    }
    if (this.contFormGroup) {
      hmsControl.focus();
      this.emailHmsControl = hmsControl;
      const abstractControl = hmsControl.getNgControl();
      if (abstractControl) {
        abstractControl.setValue('igor.mesqbessa@gmail.com')
        this.contFormGroup.addControl(
          ILoginPage.InputNames.EMAIL,
          abstractControl
        );
      }
    }
  }

  handleDisplayLoginContainer(): void {
    this.toggleLoginValidators();
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      this.validateAndPass(() =>
        this.contentObservable?.next({ displayContent: 'login' })
      );
    }
  }

  handleDisplayRegisterContainer(): void {
    if (!this.emailHmsControl?.pending$.getValue()) {
      this.toggleRegisterValidators();
      const emailNgControll = this.emailHmsControl?.getNgControl();
      if (emailNgControll) {
        this.validateAndPass(() => {
          this.contentObservable?.next({ displayContent: 'register' });
        });
      }
    }
  }

  validateAndPass(validatedFn: () => void): void {
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      const statusChangesSubscription: Subscription =
        emailNgControll.statusChanges.subscribe((status: FormControlStatus) => {
          if (status == 'VALID' && emailNgControll.valid) {
            validatedFn();
            statusChangesSubscription.unsubscribe();
          }
        });
      emailNgControll.markAsTouched();
      emailNgControll.updateValueAndValidity();
    }
  }

  toggleLoginValidators(): void {
    this.emailHmsControl?.removeAsyncValidator(
      IEmailValidator.errorKeys.existing
    );
    this.emailHmsControl?.addAsyncValidator(this.additionalValidators[0]);
  }

  toggleRegisterValidators(): void {
    this.emailHmsControl?.removeAsyncValidator(
      IEmailValidator.errorKeys.nonexisting
    );
    this.emailHmsControl?.addAsyncValidator(this.additionalValidators[1]);
  }
}
