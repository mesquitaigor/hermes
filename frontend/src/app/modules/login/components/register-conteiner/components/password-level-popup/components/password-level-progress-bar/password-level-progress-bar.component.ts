import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-level-progress-bar',
  templateUrl: 'password-level-progress-bar.component.html',
  styleUrls: ['password-level-progress-bar.component.scss'],
})
export default class PasswordLevelProgressBarComponent{
  @Input() completedLevelProgress = 0
  @Input() stepItems: string[] = []
}
