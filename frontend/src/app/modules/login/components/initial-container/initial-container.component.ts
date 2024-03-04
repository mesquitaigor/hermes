import { Component, Input } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import EmailValidator from '@validators/email-validator/EmailValidator';
import AuthService from '../../../../shared/auth/auth.service';
import { RegisterContainer } from '../register-conteiner/RegisterContainer';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EmailErrorsKeys } from '../../../../shared/validators/email-validator/EmailErrorsKeys';
import { ILoginPage } from '../../ILoginPage';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent {
  @Input() contFormGroup?: FormGroup;
  @Input() contentObservable?: BehaviorSubject<ILoginPage.LoginPageEvents>;
  emailHmsControl?: HmsInputControll;

  constructor(private authService: AuthService) {}

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    if (this.contentObservable) {
      this.contentObservable.subscribe((content) => {
        if (content?.displayContent != 'initial' && this.emailHmsControl) {
          this.emailHmsControl.removeAsyncValidator(EmailErrorsKeys.existing);
          this.emailHmsControl.removeAsyncValidator(
            EmailErrorsKeys.nonexisting
          );
        }
      });
    }
    if (this.contFormGroup) {
      hmsControl.focus();
      this.emailHmsControl = hmsControl;
      this.contFormGroup.addControl(
        RegisterContainer.FormInputNames.EMAIL,
        hmsControl.getNgControl()
      );
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
    this.emailHmsControl?.removeAsyncValidator(EmailErrorsKeys.existing);
    this.emailHmsControl?.addAsyncValidator({
      fn: EmailValidator.nonExisting(this.authService),
      key: EmailErrorsKeys.nonexisting,
      message: 'Email não cadastrado.',
    });
  }

  toggleRegisterValidators(): void {
    this.emailHmsControl?.removeAsyncValidator(EmailErrorsKeys.nonexisting);
    this.emailHmsControl?.addAsyncValidator({
      fn: EmailValidator.existing(this.authService),
      key: EmailErrorsKeys.existing,
      message: 'Email já possui cadastro.',
    });
  }
}
