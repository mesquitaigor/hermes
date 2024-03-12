import { Component, Input } from '@angular/core';
import { RuleLevelPopup } from '../../resources/RuleLevelPopup';

@Component({
  selector: 'status-item-list',
  templateUrl: 'status-item-list.component.html',
  styleUrls: ['status-item-list.component.scss'],
})
export default class StatusItemListComponent {
  @Input() popupController?: RuleLevelPopup;
}
