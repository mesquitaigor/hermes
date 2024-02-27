import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import ContentTitleComponent from './content-title.component';

@NgModule({
  declarations: [ContentTitleComponent],
  exports: [ContentTitleComponent],
  imports: [CommonModule],
})
export default class ContentTitleComponentModule {}
