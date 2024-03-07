import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRegisterContainer } from './organism/register-conteiner/IRegisterContainer';
import { BehaviorSubject } from 'rxjs';
import { ILoginPage } from './resources/ILoginPage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostBinding('class') content: ILoginPage.loginContentNames = 'initial';
  content$ = new BehaviorSubject<ILoginPage.LoginPageEvents>({});

  registerFormReadyCalls?: IRegisterContainer.OutReady;

  email = '';

  loginPageForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.content$.subscribe((content) => {
      if (content.displayContent) {
        this.content = content.displayContent;
      }
    });
  }

  handleRegisterFormReady(event: IRegisterContainer.OutReady): void {
    this.registerFormReadyCalls = event;
  }
}
