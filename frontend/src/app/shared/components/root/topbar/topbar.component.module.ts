import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopbarComponent } from './topbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
})
export default class TopbarComponentModule {}
