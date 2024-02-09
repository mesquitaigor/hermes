import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from '@components/common/hms-input/resources/models/HmsInputControll';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from '../../../../resources/enums/RegisterFormInputNames';

@Component({
  selector: 'register-lastname-input',
  templateUrl: 'register-lastname-input.component.html',
})
export default class RegisterLastNameInputComponent implements OnInit {
  lastNameInput = new HmsInputControll({
    initialValue: '',
    placeholder: 'Qual seu sobrenome?',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'submit',
  });

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.lastNameInput.recoverNgControl((props) => {
      this.loginPageService.addControl(
        RegisterFormInputNames.LAST_NAME,
        props.control
      );
    });
  }
}
