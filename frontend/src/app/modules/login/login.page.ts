import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import PasswordValidaton from '../../shared/validators/PasswordValidation';
import { loginContentNames } from './resources/types/loginContentNames';
import LoginPageService from './resources/login.page.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostBinding('class') content: loginContentNames = 'initial';

  registerForm: FormGroup = new FormGroup(
    {},
    {
      updateOn: 'submit',
      validators: [PasswordValidaton.passwordConfirmationIsEqual],
    }
  );

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.loginPageService.setRegisterForm(this.registerForm);
    this.loginPageService.$events.subscribe((next) => {
      if (next?.to == 'register') {
        this.content = 'register';
      }
      if (next?.to == 'initial') {
        this.content = 'initial';
      }
    });
  }
}
