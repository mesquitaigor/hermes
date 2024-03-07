import { NgModule } from '@angular/core';
import IllustrationContentComponent from './illustration-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IllustrationContentComponent],
  exports: [IllustrationContentComponent],
  imports: [CommonModule],
})
export default class IllustrationContentComponentModule {}
