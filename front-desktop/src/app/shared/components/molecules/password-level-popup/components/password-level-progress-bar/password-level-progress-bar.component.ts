import { Component, Input, OnInit } from '@angular/core';
import { IPasswordLevelPopup } from '../../IPasswordLevelPopup';

@Component({
  selector: 'password-level-progress-bar',
  templateUrl: 'password-level-progress-bar.component.html',
  styleUrls: ['password-level-progress-bar.component.scss'],
})
export default class PasswordLevelProgressBarComponent implements OnInit {
  @Input() popupController?: IPasswordLevelPopup.PasswordLevelPopup;

  stepsIterable: Array<number> = [];
  stepsLabel: Array<string> = [];

  completedLevel = 0;
  levelLabel = '';

  ngOnInit(): void {
    if (this.popupController) {
      this.stepsIterable = Array.from(
        { length: this.popupController.rules.length },
        (_, i) => i
      );

      this.stepsLabel = this.popupController.getRulesLabel();

      this.popupController.onChanges()?.subscribe(() => {
        const ruleAppliedLength = this.popupController?.getRuleAppliedLength();
        if (typeof ruleAppliedLength == 'number') {
          this.completedLevel = ruleAppliedLength;
        }
        this.levelLabel =
          this.popupController?.getCurrentLevelLabel(this.completedLevel) || '';
      });
    }
  }
}
