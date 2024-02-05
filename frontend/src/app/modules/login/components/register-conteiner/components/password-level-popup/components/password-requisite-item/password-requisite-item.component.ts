import { Component, Input } from '@angular/core';
import { RulesPopupInputData } from '../../password-level-popup.component';

@Component({
  selector: 'password-requisite-item-bar',
  templateUrl: 'password-requisite-item.component.html',
  styleUrls: ['password-requisite-item.component.scss'],
})
export default class PasswordRequisiteItemComponent{
  @Input() rules: RulesPopupInputData[] = []
}
