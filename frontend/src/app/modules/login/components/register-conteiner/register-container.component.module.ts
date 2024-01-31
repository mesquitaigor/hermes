import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HsmInputComponentModule from '../../../../shared/components/common/hms-input/hms-input.component.module';
import RegisterContainerComponent from './register-container.component';
import PasswordLevelPopupComponentModule from '../password-level-popup/password-level-popup.component.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ RegisterContainerComponent ],
  exports: [ RegisterContainerComponent ],
  imports: [ CommonModule, HsmInputComponentModule, PasswordLevelPopupComponentModule, ReactiveFormsModule, HsmInputComponentModule ]
})
export default class RegisterContainerComponentModule{}
