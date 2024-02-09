import { ElementRef } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
  FormControlStatus,
  ValidatorFn,
} from '@angular/forms';
import HmsNgControlOutput from '@components/common/hms-input/resources/interfaces/HmsNgControlOutput';
import HmsValidator from '@components/common/hms-input/resources/interfaces/HmsValidator';
import IHmsInputControll from '@components/common/hms-input/resources/interfaces/IHmsInputControll';

type recoverFnCb = (props: {
  control: FormControl;
  elementRef: ElementRef;
}) => void;

interface InputStyleData {
  input?: { ['text-align']?: string };
  error?: { ['text-align']?: string };
}

export default class HmsInputControll {
  initialValue = '';
  validators?: Array<HmsValidator<ValidatorFn>> = [];
  asyncValidators?: Array<HmsValidator<AsyncValidatorFn>> = [];
  updateOn: 'change' | 'blur' | 'submit' = 'change';
  autofocus = false;
  placeholder = '';
  style: InputStyleData;

  errorMessage = '';
  errorMessagesList = [];
  type = 'text';

  private recoverNgControllFn?: recoverFnCb;
  private ngControl?: FormControl;
  private inputRef?: ElementRef;
  private _onFocus_?: () => void;
  private _onBlur_?: () => void;

  constructor(props: IHmsInputControll) {
    this.initialValue = props.initialValue;
    this.validators = props.validators;
    this.asyncValidators = props.asyncValidators;
    this.updateOn = props.updateOn || 'change';
    this.autofocus = props.autofocus || false;
    this.placeholder = props.placeholder || '';
    this.type = props.type || 'text';
    this.style = props.style || {
      input: {
        ['text-align']: 'left',
      },
    };
  }

  defineInputProps(props: HmsNgControlOutput): void {
    this.ngControl = props.control;
    this.inputRef = props.elementRef;
    this.ngControl?.valueChanges.subscribe((status) => {
      this.atualizeErrorMessage(status);
    });
    this.ngControl?.statusChanges.subscribe((status) => {
      this.atualizeErrorMessage(status);
    });
    this.ngControl?.valueChanges.subscribe(() => {
      this.atualizeErrorMessage(this.ngControl?.status as FormControlStatus);
    });
    this.emitNgControll();
  }

  getNgControl(): FormControl | undefined {
    return this.ngControl;
  }

  getValidators(): Array<ValidatorFn> {
    return this.validators?.map((validator) => validator.fn) || [];
  }

  getAsyncValidators(): Array<AsyncValidatorFn> {
    return this.asyncValidators?.map((validator) => validator.fn) || [];
  }

  recoverNgControl(cb: (props: HmsNgControlOutput) => void): void {
    this.recoverNgControllFn = cb;
  }

  onBlur(cb: () => void): void {
    this._onBlur_ = cb;
  }

  onFocus(cb: () => void): void {
    this._onFocus_ = cb;
  }

  createNgControll(): FormControl {
    const formOptions: FormControlOptions = {
      validators: this.getValidators(),
      asyncValidators: this.getAsyncValidators(),
      updateOn: this.updateOn,
    };

    return new FormControl(this.initialValue || '', formOptions);
  }

  _focused_(): void {
    if (this._onFocus_) this._onFocus_();
  }

  _blured_(): void {
    if (this._onBlur_) this._onBlur_();
  }

  private atualizeErrorMessage(status: FormControlStatus): void {
    if (this.ngControl) {
      this.errorMessage = '';
      if (status == 'INVALID' && this.ngControl.touched) {
        const validatorsErrorsKeys =
          this.validators?.map((validator) => validator.key) || [];
        const asyncValidatorsErrorsKeys =
          this.asyncValidators?.map((validator) => validator.key) || [];
        this.verifyValidatorsError(this.validators, validatorsErrorsKeys);
        this.verifyValidatorsError(
          this.asyncValidators,
          asyncValidatorsErrorsKeys
        );
      }
    }
  }

  private verifyValidatorsError(
    validatorsList: Array<HmsValidator<ValidatorFn | AsyncValidatorFn>> = [],
    errorsKeys: Array<string>
  ): void {
    Object.keys(this.ngControl?.errors as Object).forEach(
      (errorKey: string) => {
        if (errorsKeys.includes(errorKey) && this.errorMessage == '') {
          this.errorMessage =
            validatorsList.find((validator) => validator.key === errorKey)
              ?.message || '';
        }
      }
    );
  }

  private emitNgControll(): void {
    if (this.ngControl && this.inputRef && this.recoverNgControllFn) {
      this.recoverNgControllFn({
        control: this.ngControl,
        elementRef: this.inputRef,
      });
      if (this.autofocus) {
        setTimeout(() => {
          this.inputRef?.nativeElement.focus();
        }, 300);
      }
    }
  }
}
