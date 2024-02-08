import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
type validatorsFn = ValidatorFn | AsyncValidatorFn;
export default interface HmsValidator<T extends validatorsFn> {
  fn: T;
  key: string;
  message: string;
}
