import { Component } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { RegisterFormInputNames } from '../../resources/enums/RegisterFormInputNames';
import LoginPageService from '../../resources/login.page.service';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import UserService from '@users/user.service';
import EmailValidator from '@validators/email-validator/EmailValidator';

@Component({
  selector: 'initial-container',
  templateUrl: 'initial-container.component.html',
  styleUrls: ['initial-container.component.scss'],
})
export default class InitialContainerComponent {
  validatingEmail = false;
  emailHmsControl?: HmsInputControll;

  readonly asyncValidatorExistingLoginKey = 'existing';

  constructor(
    private loginPageService: LoginPageService,
    private userService: UserService
  ) {}

  handleRecoveryEmailInput(hmsControl: HmsInputControll): void {
    const loginPageFormGroup = this.loginPageService.registerForm;
    if (loginPageFormGroup) {
      loginPageFormGroup.addControl(
        RegisterFormInputNames.EMAIL,
        hmsControl.getNgControl()
      );
      hmsControl.focus();
      this.emailHmsControl = hmsControl;
    }
  }

  handleValidatingEmail(stt: boolean): void {
    this.validatingEmail = stt;
  }

  handleLoginContainer(): void {
    this.emailHmsControl?.removeAsyncValidator(
      this.asyncValidatorExistingLoginKey
    );
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      this.validateAndPass(emailNgControll, () =>
        this.loginPageService.displayLoginContent()
      );
    }
  }

  handleCreateAccount(): void {
    this.emailHmsControl?.addAsyncValidator({
      fn: EmailValidator.existing(this.userService),
      key: this.asyncValidatorExistingLoginKey,
      message: 'Email já possui cadastrado.',
    });
    const emailNgControll = this.emailHmsControl?.getNgControl();
    if (emailNgControll) {
      this.validateAndPass(emailNgControll, () =>
        this.loginPageService.displayRegisterContent()
      );
    }
  }

  validateAndPass(emailNgControll: FormControl, passTo: () => void): void {
    emailNgControll.statusChanges.subscribe((status: FormControlStatus) => {
      if (status == 'VALID' && emailNgControll.valid) {
        passTo();
      }
    });
    emailNgControll.markAsTouched();
    emailNgControll.updateValueAndValidity();
  }
}
