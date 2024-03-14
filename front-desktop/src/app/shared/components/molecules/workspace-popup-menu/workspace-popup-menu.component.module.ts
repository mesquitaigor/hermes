import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import WorkspacePopupMenuComponent from './workspace-popup-menu.component';

@NgModule({
  declarations: [WorkspacePopupMenuComponent],
  exports: [WorkspacePopupMenuComponent],
  imports: [CommonModule],
})
export default class WorkspacePopupMenuComponentModule{}