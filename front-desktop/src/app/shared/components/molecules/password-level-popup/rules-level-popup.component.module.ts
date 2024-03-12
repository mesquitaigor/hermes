import { NgModule } from '@angular/core';
import RulesLevelPopupComponent from './rules-level-popup.component';
import { CommonModule } from '@angular/common';
import ProgressNivelBarComponentModule from './components/password-level-progress-bar/level-progress-bar.component.module';
import StatusItemListComponentModule from './components/status-item-list/status-item-list.component.module';

@NgModule({
  declarations: [ RulesLevelPopupComponent ],
  exports: [ RulesLevelPopupComponent ],
  imports: [ CommonModule, ProgressNivelBarComponentModule, StatusItemListComponentModule ]
})
export default class RulesLevelPopupComponentModule{}
