import { NgModule } from '@angular/core';
import InitialContainerComponent from './initial-container.component';
import { CommonModule } from '@angular/common';
import EmailInputComponentModule from '../../../../shared/components/molecules/email-input/email-input.component.module';

@NgModule({
  declarations: [InitialContainerComponent],
  exports: [InitialContainerComponent],
  imports: [CommonModule, EmailInputComponentModule],
})
export default class InitialContainerComponentModule {}
