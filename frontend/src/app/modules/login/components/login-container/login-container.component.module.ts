import { NgModule } from '@angular/core';
import LoginContainerComponent from './login-container.component';
import { CommonModule } from '@angular/common';
import LoginInputPasswordComponentModule from './components/login-input-password/login-input-password.component.module';
import ContentTitleComponentModule from '@molecules/content-title/content-title.component.module';
import EmailInputComponentModule from '@molecules/email-input/email-input.component.module';

@NgModule({
  declarations: [LoginContainerComponent],
  exports: [LoginContainerComponent],
  imports: [
    CommonModule,
    LoginInputPasswordComponentModule,
    ContentTitleComponentModule,
    EmailInputComponentModule,
  ],
})
export default class LoginContainerComponentModule {}
