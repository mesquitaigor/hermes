import { Component, Input, OnInit } from '@angular/core';
import { RuleLevelPopup } from '../../resources/RuleLevelPopup';

@Component({
  selector: 'level-progress-bar',
  templateUrl: 'level-progress-bar.component.html',
  styleUrls: ['level-progress-bar.component.scss'],
})
export default class PasswordLevelProgressBarComponent implements OnInit {
  @Input() popupController?: RuleLevelPopup;

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
