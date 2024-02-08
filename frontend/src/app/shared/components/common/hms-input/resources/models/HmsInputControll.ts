import { ElementRef } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
  FormControlStatus,
  ValidatorFn,
} from '@angular/forms';
import HmsNgControlOutput from 'src/app/shared/components/common/hms-input/resources/interfaces/HmsNgControlOutput';
import HmsValidator from 'src/app/shared/components/common/hms-input/resources/interfaces/HmsValidator';
import IHmsInputControll from 'src/app/shared/components/common/hms-input/resources/interfaces/IHmsInputControll';

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
  validators?: HmsValidator<ValidatorFn>[] = [];
  asyncValidators?: HmsValidator<AsyncValidatorFn>[] = [];
  updateOn: 'change' | 'blur' | 'submit' = 'change';
  autofocus = false;
  placeholder = '';
  style: InputStyleData;

  errorMessage = '';
  errorMessagesList = [];

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
    this.style = props.style || {
      input: {
        ['text-align']: 'left',
      },
    };
  }

  defineInputProps(props: HmsNgControlOutput) {
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

  getNgControl() {
    return this.ngControl;
  }

  getValidators() {
    return this.validators?.map((validator) => validator.fn) || [];
  }

  getAsyncValidators() {
    return this.asyncValidators?.map((validator) => validator.fn) || [];
  }

  recoverNgControl(cb: (props: HmsNgControlOutput) => void) {
    this.recoverNgControllFn = cb;
  }

  onBlur(cb: () => void) {
    this._onBlur_ = cb;
  }

  onFocus(cb: () => void) {
    this._onFocus_ = cb;
  }

  createNgControll() {
    const formOptions: FormControlOptions = {
      validators: this.getValidators(),
      asyncValidators: this.getAsyncValidators(),
      updateOn: this.updateOn,
    };

    return new FormControl(this.initialValue || '', formOptions);
  }

  private atualizeErrorMessage(status: FormControlStatus) {
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
    validatorsList: HmsValidator<ValidatorFn | AsyncValidatorFn>[] = [],
    errorsKeys: string[]
  ) {
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

  private emitNgControll() {
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

  _focused_() {
    if (this._onFocus_) this._onFocus_();
  }

  _blured_() {
    if (this._onBlur_) this._onBlur_();
  }
}
