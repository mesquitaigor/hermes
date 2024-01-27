import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { LoginRoutingPageModule } from './login-routing.page.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingPageModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
