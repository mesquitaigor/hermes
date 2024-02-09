import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControlStatus, Validators } from '@angular/forms';
import LoginPageService from '../../../resources/login.page.service';
import { RegisterFormInputNames } from '../../../resources/enums/RegisterFormInputNames';
import EmailValidator from '../../../../../shared/validators/EmailValidator';
import HmsInputControll from 'src/app/shared/components/common/hms-input/resources/models/HmsInputControll';
import HmsNgControlOutput from 'src/app/shared/components/common/hms-input/resources/interfaces/HmsNgControlOutput';
import UserService from '@users/user.service';
import { emailErrors } from 'src/app/shared/validators/emailErrors';

@Component({
  selector: 'login-input-email',
  templateUrl: 'login-input-email.component.html',
})
export default class LoginInputEmailComponent implements OnInit {
  @Output() validatingEmail = new EventEmitter<boolean>();

  emailFormControll = new HmsInputControll({
    initialValue: 'Igor@igor.com',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Digite seu email para podermos começar.',
      },
      {
        fn: EmailValidator.format,
        key: emailErrors.invalidFormat,
        message: 'Email inválido.',
      },
    ],
    asyncValidators: [
      {
        fn: EmailValidator.existing(this.userService),
        key: emailErrors.existing,
        message: 'Email já possui cadastrado.',
      },
    ],
    updateOn: 'submit',
    autofocus: true,
    placeholder: 'Digite seu melhor email',
    style: {
      input: {
        ['text-align']: 'center',
      },
    },
  });

  constructor(
    private userService: UserService,
    private loginPageService: LoginPageService
  ) {}

  ngOnInit(): void {
    this.emailFormControll.recoverNgControl((props) => {
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
    const emailControll = this.emailFormControll.getNgControl();
    emailControll?.statusChanges.subscribe((status) => {
      this.atualizeEmailErrorMessage(status);
    });
  }

  atualizeEmailErrorMessage(status: FormControlStatus): void {
    this.validatingEmail.emit(status === 'PENDING');
  }
}
