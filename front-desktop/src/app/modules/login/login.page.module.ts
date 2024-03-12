import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { LoginRoutingPageModule } from './login-routing.page.module';
import InitialContainerComponentModule from './organism/initial-container/initial-container.component.module';
import RegisterContainerComponentModule from './organism/register-conteiner/register-container.component.module';
import LoginContainerComponentModule from './organism/login-container/login-container.component.module';
import LogoContentComponentModule from './molecules/logo-content/logo-content.component.module';
import IllustrationContentComponentModule from './molecules/illustration-content/illustration-content.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingPageModule,
    ReactiveFormsModule,
    InitialContainerComponentModule,
    RegisterContainerComponentModule,
    LoginContainerComponentModule,
    LogoContentComponentModule,
    IllustrationContentComponentModule,
  ],
  declarations: [LoginPage],
  exports: [LoginPage]
})
export class LoginPageModule {}
