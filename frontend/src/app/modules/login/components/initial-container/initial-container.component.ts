import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import EmailValidator from '@validators/email-validator/EmailValidator';
import {
  OutInitialContainerAction,
  outInitialContainerDisplayValue,
} from './resources/OutInitialContainerAction';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import AuthService from '../../../../shared/auth/auth.service';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent {
  @Input() contFormGroup?: FormGroup;
  @Output() containerAction = new EventEmitter<OutInitialContainerAction>();
  emailHmsControl?: HmsInputControll;

  readonly asyncValExistingEmailKey = 'existing';
  readonly asyncValNonExistingEmailKey = 'nonexisting';

  constructor(private authService: AuthService) {}

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    if (this.contFormGroup) {
      hmsControl.focus();
      this.emailHmsControl = hmsControl;
      this.contFormGroup.addControl(
        RegisterFormInputNames.EMAIL,
        hmsControl.getNgControl()
      );
    }
  }

  handleLoginContainer(): void {
    this.toggleLoginValidators();
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      this.validateAndPass(() =>
        this.emitDisplay(emailNgControll, 'display-login')
      );
    }
  }

  handleCreateAccount(): void {
    if (!this.emailHmsControl?.pending$.getValue()) {
      this.toggleRegisterValidators();
      const emailNgControll = this.emailHmsControl?.getNgControl();
      if (emailNgControll) {
        this.validateAndPass(() =>
          this.emitDisplay(emailNgControll, 'display-register')
        );
      }
    }
  }

  validateAndPass(validatedFn: () => void): void {
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      emailNgControll.statusChanges.subscribe((status: FormControlStatus) => {
        if (status == 'VALID' && emailNgControll.valid) {
          validatedFn();
        }
      });
      emailNgControll.markAsTouched();
      emailNgControll.updateValueAndValidity();
    }
  }

  toggleLoginValidators(): void {
    this.emailHmsControl?.removeAsyncValidator(this.asyncValExistingEmailKey);
    this.emailHmsControl?.addAsyncValidator({
      fn: EmailValidator.nonExisting(this.authService),
      key: this.asyncValNonExistingEmailKey,
      message: 'Email não cadastrado.',
    });
  }

  toggleRegisterValidators(): void {
    this.emailHmsControl?.removeAsyncValidator(
      this.asyncValNonExistingEmailKey
    );
    this.emailHmsControl?.addAsyncValidator({
      fn: EmailValidator.existing(this.authService),
      key: this.asyncValExistingEmailKey,
      message: 'Email já possui cadastro.',
    });
  }

  emitDisplay(
    emailNgControll: FormControl<string>,
    displayValue: outInitialContainerDisplayValue
  ): void {
    this.containerAction.emit({
      action: displayValue,
      email: emailNgControll.value,
    });
  }
}
