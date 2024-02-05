import { NgModule } from '@angular/core';
import InitialContainerComponent from './initial-container.component';
import { CommonModule } from '@angular/common';
import LoginInputEmailComponentModule from './login-input-email/login-input-email.component.module';

@NgModule({
  declarations: [ InitialContainerComponent ],
  exports: [ InitialContainerComponent ],
  imports: [ CommonModule, LoginInputEmailComponentModule ]
})
export default class InitialContainerComponentModule{}
