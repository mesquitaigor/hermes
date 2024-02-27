import { NgModule } from '@angular/core';
import LoginInputPasswordComponent from './login-input-password.component';
import { CommonModule } from '@angular/common';
import HsmInputComponentModule from '../../../../../../shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [LoginInputPasswordComponent],
  exports: [LoginInputPasswordComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class LoginInputPasswordComponentModule {}
