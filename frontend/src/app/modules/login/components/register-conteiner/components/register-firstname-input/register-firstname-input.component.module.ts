import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import RegisterFirstNameInputComponent from './register-firstname-input.component';

@NgModule({
  declarations: [RegisterFirstNameInputComponent],
  exports: [RegisterFirstNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class RegisterFirstNameInputComponentModule {}
