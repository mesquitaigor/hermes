import { NgModule } from '@angular/core';
import LoginInputEmailComponent from './login-input-email.component';
import { CommonModule } from '@angular/common';
import HsmInputComponentModule from '../../../../../shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [ LoginInputEmailComponent ],
  exports: [ LoginInputEmailComponent ],
  imports: [ CommonModule, HsmInputComponentModule ]
})
export default class LoginInputEmailComponentModule{}
