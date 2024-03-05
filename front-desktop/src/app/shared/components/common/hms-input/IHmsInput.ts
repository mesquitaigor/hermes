import { ElementRef } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export namespace IHmsInput {
  export interface NgControlOutput {
    control: FormControl;
    elementRef: ElementRef;
  }
  export interface InputStyle {
    input?: { ['text-align']?: string };
    error?: { ['text-align']?: string };
  }
  export type recoverFnCb = (props: {
    control: FormControl;
    elementRef: ElementRef;
  }) => void;

  export type validatorsFn = ValidatorFn | AsyncValidatorFn;
  export interface ValidatorStructure {
    key?: string;
    message?: string;
    toast?: string;
  }
  export interface Validator<T extends validatorsFn>
    extends ValidatorStructure {
    fn: T;
    keys?: Array<ValidatorStructure>;
  }
  export interface IHmsInputControll {
    initialValue: string;
    validators?: Array<Validator<ValidatorFn>>;
    asyncValidators?: Array<Validator<AsyncValidatorFn>>;
    updateOn?: 'change' | 'blur' | 'submit';
    autofocus?: boolean;
    placeholder?: string;
    autocapitalize?:
      | 'none'
      | 'off'
      | 'sentences'
      | 'characters'
      | 'words'
      | 'off';
    type?: string;
    style?: {
      input?: { ['text-align']?: string; ['text-transform']?: string };
      error?: { ['text-align']?: string };
    };
  }
}
