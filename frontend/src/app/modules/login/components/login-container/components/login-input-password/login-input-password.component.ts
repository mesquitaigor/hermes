import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControlStatus, Validators } from '@angular/forms';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from '../../../../resources/enums/RegisterFormInputNames';
import EmailValidator from '@validators/email-validator/EmailValidator';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import HmsNgControlOutput from '@components/common/hms-input/resources/interfaces/HmsNgControlOutput';
import { EmailErrorsKeys } from '@validators/email-validator/EmailErrorsKeys';

@Component({
  selector: 'login-input-password',
  templateUrl: 'login-input-password.component.html',
})
export default class LoginInputPasswordComponent implements OnInit {
  @Output() validatingEmail = new EventEmitter<boolean>();

  passwordFormControll = new HmsInputControll({
    initialValue: '',
    type: 'password',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Senha obrigatória.',
      },
      {
        fn: EmailValidator.format,
        key: EmailErrorsKeys.invalidFormat,
        message: 'A senha deve ter no mínimo 8 caracteres.',
      },
    ],
    updateOn: 'submit',
    placeholder: 'Digite sua senha',
    style: {
      input: {
        ['text-align']: 'center',
      },
    },
  });

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.passwordFormControll.recoverNgControl((props) => {
      this.recoverNgEmailControl(props);
    });
  }

  recoverNgEmailControl(hmsInputNgControl: HmsNgControlOutput): void {
    if (this.loginPageService.registerForm) {
      this.loginPageService.addControl(
        RegisterFormInputNames.EMAIL,
        hmsInputNgControl.control
      );
      this.listenEmailStatusChanges();
    }
  }

  listenEmailStatusChanges(): void {
    const emailControll = this.passwordFormControll.getNgControl();
    emailControll?.statusChanges.subscribe((status) => {
      this.atualizeEmailErrorMessage(status);
    });
  }

  atualizeEmailErrorMessage(status: FormControlStatus): void {
    this.validatingEmail.emit(status === 'PENDING');
  }
}
