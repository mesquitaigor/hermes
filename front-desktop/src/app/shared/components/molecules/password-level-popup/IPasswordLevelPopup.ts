import { EventEmitter, signal } from '@angular/core';
import { PasswordErrors } from '../../../validators/password-validator/PasswordErrors';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export namespace IPasswordLevelPopup {
  export type progressBarActionType = 'add' | 'remove';
  export interface Inputs {
    popupController: PasswordLevelPopup | undefined;
    show: boolean;
  }
  export interface Controller {
    changeProgressBar: (type: progressBarActionType) => void;
    getProgressBar: () => number;
  }
  export interface Output {
    handlePopupController: EventEmitter<Controller>;
  }
  export interface IRules {
    condition: () => boolean;
    levelText: string;
    label: string;
    ruleApplied?: boolean;
  }
  export class PasswordLevelPopup {
    show = false;
    firstLabel = 'Nível da sua senha';
    rules: Array<PasswordRule> = [
      new PasswordRule({
        label: 'Possui letras maiusculas',
        condition: () =>
          this.pristineInputRuleCondition(
            PasswordErrors.shouldHaveUpperLetters
          ),
        levelText: 'Tá fraca ainda.',
      }),
      new PasswordRule({
        label: 'Possui letras mínusculas',
        condition: () =>
          this.pristineInputRuleCondition(
            PasswordErrors.shouldHaveLowerLetters
          ),
        levelText: 'Começou a melhorar.',
      }),
      new PasswordRule({
        label: 'Possui números',
        condition: () =>
          this.pristineInputRuleCondition(PasswordErrors.shouldHaveNumbers),
        levelText: 'Tá indo...',
      }),
      new PasswordRule({
        label: 'Possui carácteres expeciais',
        condition: () =>
          this.pristineInputRuleCondition(
            PasswordErrors.shouldHavespecialCharacters
          ),
        levelText: 'Tá ficando boa em!',
      }),
      new PasswordRule({
        label: 'Possui mais de 8 dígitos',
        condition: (): boolean => {
          return (
            this.pristineInputRuleCondition('minlength') &&
            this.pristineInputRuleCondition('required')
          );
        },
        levelText: 'Agora sim!',
      }),
    ];

    private controller?: IPasswordLevelPopup.Controller;
    private passwordInput?: AbstractControl;

    onChanges(): Observable<unknown> | undefined {
      return this.passwordInput?.valueChanges;
    }

    getRuleAppliedLength(){
      return this.rules.filter(
        (rule) => rule.isApplied()
      ).length;
    }

    setPopupController(controller: IPasswordLevelPopup.Controller): void {
      this.controller = controller;
    }

    getPopupController(): IPasswordLevelPopup.Controller | undefined {
      return this.controller;
    }

    getRulesLabel(){
      return this.rules.map((rule) => rule.getLabel());
    }

    atualizeRulesStatus(){
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

    changeProgress(action: IPasswordLevelPopup.progressBarActionType): void {
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
  export class PasswordRule{
    private _label = ''
    private _condition = () => false
    private _levelText = ''
    private _applied = false
    state$ = new BehaviorSubject<{label: string, isOk: boolean}>(this.simpleStructure());
    constructor(props: IRules){
      this._label = props.label;
      this._condition = props.condition;
      this._levelText = props.levelText;
      this._applied = props.ruleApplied || false;
      this.next();
    }

    getLabel(): string{
      return this._label;
    }

    getLevelText(): string{
      return this._levelText;
    }

    isApplied(): boolean{
      return this._applied;
    }

    private simpleStructure(){
      return {
        label: this._label,
        isOk: this._applied,
      }
    }
    
    next(){
      this.state$.next(this.simpleStructure());
    }

    updateStatus(){
      this._applied = this._condition();
      this.next();
    }
  }
}
