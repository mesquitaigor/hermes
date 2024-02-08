import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import RegisterFirstNameInputComponent from 'src/app/modules/login/components/register-conteiner/components/register-firstname-input/register-firstname-input.component';
import HsmInputComponentModule from 'src/app/shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [RegisterFirstNameInputComponent],
  exports: [RegisterFirstNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class RegisterFirstNameInputComponentModule {}
