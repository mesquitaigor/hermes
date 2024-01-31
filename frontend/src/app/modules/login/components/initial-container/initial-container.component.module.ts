import { NgModule } from '@angular/core';
import InitialContainerComponent from './initial-container.component';
import { CommonModule } from '@angular/common';
import HsmInputComponentModule from '../../../../shared/components/common/hms-input/hms-input.component.module';

@NgModule({
  declarations: [ InitialContainerComponent ],
  exports: [ InitialContainerComponent ],
  imports: [ CommonModule, HsmInputComponentModule ]
})
export default class InitialContainerComponentModule{}
