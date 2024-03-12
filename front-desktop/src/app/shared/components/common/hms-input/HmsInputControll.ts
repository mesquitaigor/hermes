import { ElementRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
  FormControlStatus,
  ValidatorFn,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IHmsInput } from './IHmsInput';
import ToastController from '../../../controllers/toast/toast.controller';

export default class HmsInputControll {
  initialValue = '';
  icon = '';
  validators: Array<IHmsInput.Validator<ValidatorFn>> = [];
  asyncValidators: Array<IHmsInput.Validator<AsyncValidatorFn>> = [];
  updateOn: 'change' | 'blur' | 'submit' = 'change';
  autofocus = false;
  placeholder = '';
  style: IHmsInput.InputStyle;
  autocapitalize:
    | 'none'
    | 'off'
    | 'sentences'
    | 'characters'
    | 'words'
    | 'off' = 'none';

  errorMessage = '';
  type = 'text';
  pending$ = new BehaviorSubject(false);

  private __toastController?: ToastController;
  private recoverNgControllFn?: IHmsInput.recoverFnCb;
  private ngControl?: FormControl;
  private inputRef?: ElementRef;
  private __onFocus?: () => void;
  private __onBlur?: () => void;

  constructor(props: IHmsInput.IHmsInputControll) {
    this.initialValue = props.initialValue;
    this.icon = props.icon || '';
    this.validators = props.validators || [];
    this.asyncValidators = props.asyncValidators || [];
    this.updateOn = props.updateOn || 'change';
    this.autofocus = props.autofocus || false;
    this.placeholder = props.placeholder || '';
    this.type = props.type || 'text';
    this.autocapitalize = props.autocapitalize || 'none';
    this.style = props.style || {
      input: {
        ['text-align']: 'left',
      },
    };
  }

  setToastController(toastController: ToastController): void {
    this.__toastController = toastController;
  }

  focus(): void {
    this.inputRef?.nativeElement.focus();
  }

  getInputRef(): ElementRef<HTMLInputElement> | undefined {
    return this.inputRef;
  }

  setValue(value?: string | number): void {
    this.ngControl?.setValue(value);
  }

  defineInputProps(props: IHmsInput.NgControlOutput): void {
    this.inputRef = props.elementRef;
    this.defineNgControl(props.control);
    this.emitNgControll();
  }

  getNgControl(): AbstractControl | undefined {
    return this.ngControl;
  }

  getValidators(): Array<ValidatorFn> {
    return this.validators.map((validator) => validator.fn);
  }

  getAsyncValidators(): Array<AsyncValidatorFn> {
    return this.asyncValidators.map((validator) => validator.fn);
  }

  recoverNgControl(cb: (props: IHmsInput.NgControlOutput) => void): void {
    this.recoverNgControllFn = cb;
  }

  onBlur(cb: () => void): void {
    this.__onBlur = cb;
  }

  onFocus(cb: () => void): void {
    this.__onFocus = cb;
  }

  addValidator(
    hmsAsyncValidator: IHmsInput.Validator<ValidatorFn>
  ): void {
    this.ngControl?.addValidators(hmsAsyncValidator.fn);
    this.validators.push(hmsAsyncValidator);
    this.ngControl?.updateValueAndValidity();
  }
  
  addAsyncValidator(
    hmsAsyncValidator: IHmsInput.Validator<AsyncValidatorFn>
  ): void {
    this.ngControl?.addAsyncValidators(hmsAsyncValidator.fn);
    this.asyncValidators.push(hmsAsyncValidator);
    this.ngControl?.updateValueAndValidity();
  }

  removeAsyncValidator(key: string): void {
    const index = this.asyncValidators.findIndex((v) => {
      return (typeof v.key == 'string' && v.key === key) || (v.keys && v.keys.some((k) => k.key === key));
    });
    if (index !== -1) {
      this.ngControl?.removeAsyncValidators(this.asyncValidators[index].fn);
      this.asyncValidators = this.asyncValidators.splice(index, 1);
    }
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
    if (this.__onFocus) this.__onFocus();
  }

  _blured_(): void {
    if (this.__onBlur) this.__onBlur();
  }

  private defineNgControl(control: FormControl): void {
    this.ngControl = control;
    this.ngControl.valueChanges.subscribe((status) => {
      this.atualizeErrorMessage(status);
    });
    this.ngControl.statusChanges.subscribe((status) => {
      this.atualizeErrorMessage(status);
    });
    this.ngControl.valueChanges.subscribe(() => {
      this.atualizeErrorMessage(this.ngControl?.status as FormControlStatus);
    });

    this.ngControl.statusChanges.subscribe((status) => {
      this.pending$.next(status === 'PENDING');
    });
  }

  private atualizeErrorMessage(status: FormControlStatus): void {
    if (this.ngControl) {
      this.errorMessage = '';
      if (status == 'INVALID' && this.ngControl.touched) {
        this.verifyValidatorsError(this.validators);
        this.verifyValidatorsError(this.asyncValidators);
      }
    }
  }

  private verifyValidatorsError(
    validatorsList: Array<
      IHmsInput.Validator<ValidatorFn | AsyncValidatorFn>
    > = []
  ): void {
    const keys = this.getValidatorKeys(validatorsList);
    Object.keys(this.ngControl?.errors as Object).forEach(
      (ngErrorKey: string) => {
        if (keys.includes(ngErrorKey) && this.errorMessage == '') {
          const targetValidator = this.getValidatorStructures(
            validatorsList
          ).find((validator) => {
            if (validator?.key) {
              return validator.key === ngErrorKey;
            } else return false;
          });
          if (targetValidator?.message) {
            this.errorMessage = targetValidator.message || '';
          } else if (targetValidator?.toast) {
            this.__toastController?.error(targetValidator.toast);
          }
        }
      }
    );
  }

  private getValidatorStructures(
    validatorsList: Array<IHmsInput.Validator<ValidatorFn | AsyncValidatorFn>>
  ): Array<void | IHmsInput.ValidatorStructure> {
    return validatorsList
      .map(
        (
          validator
        ):
          | IHmsInput.ValidatorStructure
          | Array<IHmsInput.ValidatorStructure>
          | void => {
          if (validator.key) {
            return validator;
          } else if (validator.keys) {
            return validator.keys;
          }
        }
      )
      .flat()
      .filter((validator) => validator?.key);
  }

  private getValidatorKeys(
    validators: Array<IHmsInput.Validator<ValidatorFn | AsyncValidatorFn>>
  ): Array<string> {
    return validators
      .map((validator): string | Array<string> | void => {
        if (validator.key) {
          return validator.key;
        } else if (validator.keys?.length) {
          return validator.keys.map((key) => key.key) as Array<string>;
        }
      })
      .flat()
      .filter((key: string | void) => typeof key == 'string') as Array<string>;
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
