import { Component } from '@angular/core';

@Component({
  selector: 'password-level-popup-component',
  templateUrl: 'password-level-popup.component.html',
  styleUrls: ['password-level-popup.component.scss'],
})
export default class PasswordLevelPopupComponent{
  show = false
  completedLevelProgressBar = 0

  rules: [{condition: () => boolean, label: string}] = []
}
