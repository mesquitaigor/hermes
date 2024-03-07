import { NgModule } from '@angular/core';
import LogoContentComponent from './logo-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LogoContentComponent],
  exports: [LogoContentComponent],
  imports: [CommonModule],
})
export default class LogoContentComponentModule {}
