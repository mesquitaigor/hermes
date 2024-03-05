import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PasswordErrors } from '@validators/password-validator/PasswordErrors';
import RulesPopupInputData from '../interfaces/RulesPopupInputData';
import PasswordPopupController from '../interfaces/PasswordPopupController';
import { progressBarActionType } from '../types/progressBarActionType';

export default class PasswordLevelPopup {
  show = false;
  firstLabel = 'Nível da sua senha';
  rules: Array<RulesPopupInputData> = [
    {
      label: 'Possui letras maiusculas',
      condition: () =>
        this.pristineInputRuleCondition(PasswordErrors.shouldHaveUpperLetters),
      levelText: 'Tá fraca ainda.',
      ruleApplied: false,
    },
    {
      label: 'Possui letras mínusculas',
      condition: () =>
        this.pristineInputRuleCondition(PasswordErrors.shouldHaveLowerLetters),
      levelText: 'Começou a melhorar.',
      ruleApplied: false,
    },
    {
      label: 'Possui números',
      condition: () =>
        this.pristineInputRuleCondition(PasswordErrors.shouldHaveNumbers),
      levelText: 'Tá indo...',
      ruleApplied: false,
    },
    {
      label: 'Possui carácteres expeciais',
      condition: () =>
        this.pristineInputRuleCondition(
          PasswordErrors.shouldHavespecialCharacters
        ),
      levelText: 'Tá ficando boa em!',
      ruleApplied: false,
    },
    {
      label: 'Possui mais de 8 dígitos',
      condition: (): boolean => {
        return (
          this.pristineInputRuleCondition('minlength') &&
          this.pristineInputRuleCondition('required')
        );
      },
      levelText: 'Agora sim!',
      ruleApplied: false,
    },
  ];

  private controller?: PasswordPopupController;
  private passwordInput?: AbstractControl;

  onChanges(): Observable<unknown> | undefined {
    return this.passwordInput?.valueChanges;
  }

  setPopupController(controller: PasswordPopupController): void {
    this.controller = controller;
  }
  getPopupController(): PasswordPopupController | undefined {
    return this.controller;
  }

  setPasswordInput(control: AbstractControl): void {
    this.passwordInput = control;
  }
  getPasswordInput(): AbstractControl | undefined {
    return this.passwordInput;
  }

  changeProgress(action: progressBarActionType): void {
    this.controller?.changeProgressBar(action);
  }

  getProgressBar(): number | undefined {
    return this.controller?.getProgressBar();
  }

  pristineInputRuleCondition(errorName: string): boolean {
    return (
      !this.passwordInput?.errors?.[errorName] && !this.passwordInput?.pristine
    );
  }
}
