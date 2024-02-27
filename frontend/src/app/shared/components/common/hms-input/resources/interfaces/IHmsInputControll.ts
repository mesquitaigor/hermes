import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import HmsValidator from '@components/common/hms-input/resources/interfaces/HmsValidator';

export default interface IHmsInputControll {
  initialValue: string;
  validators?: Array<HmsValidator<ValidatorFn>>;
  asyncValidators?: Array<HmsValidator<AsyncValidatorFn>>;
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
    input?: { ['text-align']?: string };
    error?: { ['text-align']?: string };
  };
}
