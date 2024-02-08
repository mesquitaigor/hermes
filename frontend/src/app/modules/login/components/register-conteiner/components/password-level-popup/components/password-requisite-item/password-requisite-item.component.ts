import { Component, Input } from '@angular/core';
import RulesPopupInputData from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/RulesPopupInputData';

@Component({
  selector: 'password-requisite-item-bar',
  templateUrl: 'password-requisite-item.component.html',
  styleUrls: ['password-requisite-item.component.scss'],
})
export default class PasswordRequisiteItemComponent {
  @Input() rules: RulesPopupInputData[] = [];
}
