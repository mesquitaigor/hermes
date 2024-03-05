import { validatorResult } from '../validatorResult';

export namespace IEmailValidator {
  export enum errorKeys {
    invalidFormat = 'invalidFormat',
    existing = 'existing',
    nonexisting = 'nonexisting',
    validatorHttpError = 'validatorHttpError',
  }
  export type errors = validatorResult<typeof errorKeys>;
}
