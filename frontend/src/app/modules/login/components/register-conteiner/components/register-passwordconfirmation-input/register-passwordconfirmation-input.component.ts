import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from '../../../../resources/enums/RegisterFormInputNames';

@Component({
  selector: 'register-passwordconfirmation-input',
  templateUrl: 'register-passwordconfirmation-input.component.html',
})
export default class RegisterPasswordConfirmationInputComponent
  implements OnInit
{
  lastNameInput = new HmsInputControll({
    initialValue: '',
    type: 'password',
    placeholder: 'Confirme sua senha',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'change',
  });

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.lastNameInput.recoverNgControl((props) => {
      this.loginPageService.addControl(
        RegisterFormInputNames.PASSWORD_CONFIRMATION,
        props.control
      );
    });
  }
}
