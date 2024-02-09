import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import HsmInputComponentModule from '@components/common/hms-input/hms-input.component.module';
import RegisterLastNameInputComponent from './register-lastname-input.component';

@NgModule({
  declarations: [RegisterLastNameInputComponent],
  exports: [RegisterLastNameInputComponent],
  imports: [CommonModule, HsmInputComponentModule],
})
export default class RegisterLastNameInputComponentModule {}
