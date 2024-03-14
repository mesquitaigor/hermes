import { Component, ElementRef, HostBinding, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRegisterContainer } from './organism/register-conteiner/IRegisterContainer';
import { BehaviorSubject, take } from 'rxjs';
import { ILoginPage } from './resources/ILoginPage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChildren('loginContainer') queryLoginContainer?: QueryList<ElementRef>;
  @ViewChildren('registerContainer') queryRegisterContainer?: QueryList<ElementRef>;
  @HostBinding('class') content: ILoginPage.loginContentNames = 'initial';
  content$ = new BehaviorSubject<ILoginPage.LoginPageEvents>({});
  showLoginContainer = false
  showRegisterContainer = false

  registerFormReadyCalls?: IRegisterContainer.OutReady;

  email = '';

  loginPageForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.content$.subscribe((content) => {
      if (content.displayContent) {
        if(content.displayContent === 'login' && this.queryLoginContainer && this.queryLoginContainer.length == 0){
          this.queryLoginContainer.changes.pipe(take(1)).subscribe(() => {
            this.content = 'login';
          })
          this.showLoginContainer = true;
        }else if(content.displayContent === 'register' && this.queryRegisterContainer && this.queryRegisterContainer.length == 0){
          this.queryRegisterContainer.changes.pipe(take(1)).subscribe(() => {
            this.content = 'register';
          })
          this.showRegisterContainer = true;
        }else{
          this.content = content.displayContent;
        }
      }
    });
  }

  handleRegisterFormReady(event: IRegisterContainer.OutReady): void {
    this.registerFormReadyCalls = event;
  }
}
