import { AbstractControl } from '@angular/forms';
import { IRulesLevelPopup } from './IRulesLevelPopup';
import { Observable } from 'rxjs';
import { Rule } from './Rule';

export class RuleLevelPopup {
  show = false;
  firstLabel = '';
  rules: Array<Rule> = [];

  private controller?: IRulesLevelPopup.Controller;
  private passwordInput?: AbstractControl;

  onChanges(): Observable<unknown> | undefined {
    return this.passwordInput?.valueChanges;
  }

  getRuleAppliedLength(): number{
    return this.rules.filter(
      (rule) => rule.isApplied()
    ).length;
  }

  setPopupController(controller: IRulesLevelPopup.Controller): void {
    this.controller = controller;
  }

  getPopupController(): IRulesLevelPopup.Controller | undefined {
    return this.controller;
  }

  getRulesLabel(): Array<string>{
    return this.rules.map((rule) => rule.getLabel());
  }

  atualizeRulesStatus(): void{
    this.rules.forEach((rule) => {
      rule.updateStatus();
    });
  }

  getCurrentLevelLabel(currentLevel: number): string{
    return this.rules[currentLevel - 1]?.getLevelText()
  }

  setPasswordInput(control: AbstractControl): void {
    this.passwordInput = control;
  }
  getPasswordInput(): AbstractControl | undefined {
    return this.passwordInput;
  }

  changeProgress(action: IRulesLevelPopup.progressBarActionType): void {
    this.controller?.changeProgressBar(action);
  }

  getProgressBar(): number | undefined {
    return this.controller?.getProgressBar();
  }

  pristineInputRuleCondition(errorName: string): boolean {
    return (
      !this.passwordInput?.errors?.[errorName] &&
      !this.passwordInput?.pristine
    );
  }
}