import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import HmsValidator from 'src/app/shared/components/common/hms-input/resources/interfaces/HmsValidator';

export default interface IHmsInputControll {
  initialValue: string;
  validators?: HmsValidator<ValidatorFn>[];
  asyncValidators?: HmsValidator<AsyncValidatorFn>[];
  updateOn?: 'change' | 'blur' | 'submit';
  autofocus?: boolean;
  placeholder?: string;
  style?: {
    input?: { ['text-align']?: string };
    error?: { ['text-align']?: string };
  };
}
