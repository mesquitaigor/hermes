import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import RegisterLastNameInputComponent from 'src/app/modules/login/components/register-conteiner/components/register-lastname-input/register-lastname-input.component';
import HsmInputComponentModule from 'src/app/shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [RegisterLastNameInputComponent],
  exports: [RegisterLastNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class RegisterLastNameInputComponentModule {}
