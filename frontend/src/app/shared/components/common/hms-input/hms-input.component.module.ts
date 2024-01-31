import { NgModule } from '@angular/core';
import HsmInputComponent from './hms-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ HsmInputComponent ],
  exports: [ HsmInputComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ]
})
export default class HsmInputComponentModule{}
