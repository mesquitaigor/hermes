import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import WorkspacePopupMenuComponentModule from '../../molecules/workspace-popup-menu/workspace-popup-menu.component.module';

@NgModule({
  imports: [CommonModule, WorkspacePopupMenuComponentModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export default class SidebarComponentModule {}
