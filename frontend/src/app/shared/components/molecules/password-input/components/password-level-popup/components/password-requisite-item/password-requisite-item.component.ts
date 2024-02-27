import { Component, Input } from '@angular/core';
import PasswordLevelPopup from '../../resources/models/PasswordLevelPopup';

@Component({
  selector: 'password-requisite-item-bar',
  templateUrl: 'password-requisite-item.component.html',
  styleUrls: ['password-requisite-item.component.scss'],
})
export default class PasswordRequisiteItemComponent {
  @Input() popupController?: PasswordLevelPopup;
}