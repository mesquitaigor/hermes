import { AbstractControl } from '@angular/forms';
import PasswordPopupController from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordPopupController';
import RulesPopupInputData from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/RulesPopupInputData';

export default class PasswordLevelPopup {
  show = false;
  firstLabel = 'Nível da sua senha';
  private controller?: PasswordPopupController;
  private passwordInput?: AbstractControl;
  rules: RulesPopupInputData[] = [
    {
      label: 'Possui letras maiusculas',
      condition: () =>
        this.pristineInputRuleCondition('shouldHaveUpperLetters'),
      levelText: 'Tá fraca ainda.',
    },
    {
      label: 'Possui letras mínusculas',
      condition: () =>
        this.pristineInputRuleCondition('shouldHaveLowerLetters'),
      levelText: 'Começou a melhorar.',
    },
    {
      label: 'Possui números',
      condition: () => this.pristineInputRuleCondition('shouldHaveNumbers'),
      levelText: 'Tá indo...',
    },
    {
      label: 'Possui carácteres expeciais',
      condition: () =>
        this.pristineInputRuleCondition('shouldHavespecialCharacters'),
      levelText: 'Tá ficando boa em!',
    },
    {
      label: 'Possui mais de 8 dígitos',
      condition: () => this.pristineInputRuleCondition('minlength'),
      levelText: 'Agora sim!',
    },
  ];

  setPopupController(controller: PasswordPopupController) {
    this.controller = controller;
  }
  getPopupController() {
    return this.controller;
  }

  setPasswordInput(control: AbstractControl) {
    this.passwordInput = control;
  }
  getPasswordInput() {
    return this.passwordInput;
  }

  changeProgress(action: any) {
    this.controller?.changeProgressBar(action);
  }

  getProgressBar() {
    return this.controller?.getProgressBar();
  }

  pristineInputRuleCondition(errorName: string) {
    return (
      !this.passwordInput?.errors?.[errorName] && !this.passwordInput?.pristine
    );
  }
}
