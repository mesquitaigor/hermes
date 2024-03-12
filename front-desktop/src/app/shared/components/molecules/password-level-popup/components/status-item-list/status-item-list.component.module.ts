import { NgModule } from '@angular/core';
import StatusItemListComponent from './status-item-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ StatusItemListComponent ],
  exports: [ StatusItemListComponent ],
  imports: [ CommonModule ]
})
export default class StatusItemListComponentModule{}
