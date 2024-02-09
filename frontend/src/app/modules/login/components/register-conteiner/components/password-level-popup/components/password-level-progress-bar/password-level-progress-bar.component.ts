import { Component, Input, OnInit } from '@angular/core';
import PasswordLevelPopup from 'src/app/modules/login/components/register-conteiner/resources/models/PasswordLevelPopup';

@Component({
  selector: 'password-level-progress-bar',
  templateUrl: 'password-level-progress-bar.component.html',
  styleUrls: ['password-level-progress-bar.component.scss'],
})
export default class PasswordLevelProgressBarComponent implements OnInit {
  @Input() popupController?: PasswordLevelPopup;

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

      this.stepsLabel = this.popupController.rules.map((rule) => rule.label);

      this.popupController.onChanges()?.subscribe(() => {
        const ruleAppliedLength = this.popupController?.rules.filter(
          (rule) => rule.ruleApplied
        ).length;
        if (typeof ruleAppliedLength == 'number') {
          this.completedLevel = ruleAppliedLength;
        }
        this.levelLabel =
          this.popupController?.rules[this.completedLevel - 1].levelText || '';
      });
    }
  }
}
