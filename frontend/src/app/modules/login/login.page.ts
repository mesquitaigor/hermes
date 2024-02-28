import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginContentNames } from './resources/types/loginContentNames';
import LoginPageService from './resources/login.page.service';
import { OutInitialContainerAction } from './components/initial-container/resources/OutInitialContainerAction';
import OutRegisterContainerReady from './components/register-conteiner/resources/OutRegisterContainerReady';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  @HostBinding('class') content: loginContentNames = 'initial';

  registerFormReadyCalls: OutRegisterContainerReady | undefined;

  email = '';

  loginPageForm: FormGroup = new FormGroup({});

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit(): void {
    this.loginPageService.setRegisterForm(this.loginPageForm);
    this.loginPageService.$events.subscribe((next) => {
      if (next) {
        if (this.registerFormReadyCalls) {
          if (this.content == 'initial' && next.to == 'register') {
            this.registerFormReadyCalls.addControls(this.loginPageForm);
          } else if (this.content == 'register' && next.to == 'initial') {
            this.registerFormReadyCalls.removeControls(this.loginPageForm);
          }
        }
        this.content = next.to;
      }
    });
  }

  handleDisplayBack(): void {
    this.loginPageService.displayInitialContent();
  }

  handleRegisterFormReady(event: OutRegisterContainerReady): void {
    this.registerFormReadyCalls = event;
  }

  handleInitialContainerAction(event: OutInitialContainerAction): void {
    if (event.action == 'display-login') {
      this.loginPageService.displayLoginContent();
    } else if (event.action == 'display-register') {
      this.loginPageService.displayRegisterContent();
    }
  }
}
