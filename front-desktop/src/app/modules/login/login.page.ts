import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterContainer } from './components/register-conteiner/RegisterContainer';
import { BehaviorSubject } from 'rxjs';
import { ILoginPage } from './ILoginPage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostBinding('class') content: ILoginPage.loginContentNames = 'initial';
  content$ = new BehaviorSubject<ILoginPage.LoginPageEvents>({});

  registerFormReadyCalls?: RegisterContainer.OutReady;

  email = '';

  loginPageForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.content$.subscribe((content) => {
      if (content?.displayContent) {
        this.content = content.displayContent;
      }
    });
  }

  handleRegisterFormReady(event: RegisterContainer.OutReady): void {
    this.registerFormReadyCalls = event;
  }
}
