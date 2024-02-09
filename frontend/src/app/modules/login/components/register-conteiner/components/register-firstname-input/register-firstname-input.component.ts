import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from 'src/app/shared/components/common/hms-input/resources/models/HmsInputControll';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from 'src/app/modules/login/resources/enums/RegisterFormInputNames';

@Component({
  selector: 'register-firstname-input',
  templateUrl: 'register-firstname-input.component.html',
})
export default class RegisterFirstNameInputComponent implements OnInit {
  firstNameInput = new HmsInputControll({
    initialValue: '',
    placeholder: 'Como podemos te chamar?',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'submit',
  });

  fistNameInputElement?: ElementRef;

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.focusWhenOpenContainer();
    this.recoverNgControl();
  }

  recoverNgControl(): void {
    this.firstNameInput.recoverNgControl((props) => {
      this.loginPageService.addControl(
        RegisterFormInputNames.FIRST_NAME,
        props.control
      );
      this.fistNameInputElement = props.elementRef;
    });
  }

  focusWhenOpenContainer(): void {
    this.loginPageService.$events.subscribe((next) => {
      if (next?.to == 'register') {
        this.fistNameInputElement?.nativeElement.focus();
      }
    });
  }
}
