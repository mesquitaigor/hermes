import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { LoginRoutingPageModule } from './login-routing.page.module';
import PasswordLevelPopupComponentModule from '../../shared/components/molecules/password-input/components/password-level-popup/password-level-popup.component.module';
import InitialContainerComponentModule from './components/initial-container/initial-container.component.module';
import RegisterContainerComponentModule from './components/register-conteiner/register-container.component.module';
import LoginContainerComponentModule from './components/login-container/login-container.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingPageModule,
    ReactiveFormsModule,
    PasswordLevelPopupComponentModule,
    InitialContainerComponentModule,
    RegisterContainerComponentModule,
    LoginContainerComponentModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
