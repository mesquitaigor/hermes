import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { ValidatorFn, Validators } from '@angular/forms';
import PasswordValidator from '@validators/password-validator/PasswordValidatior';
import { PasswordErrors } from '@validators/password-validator/PasswordErrors';
import PopupModel from '@controllers/popup/resources/PopupModel';
import PopupController from '@controllers/popup/popup.controller';
import RulesLevelPopupComponent from '../password-level-popup/rules-level-popup.component';
import { IRulesLevelPopup } from '../password-level-popup/resources/IRulesLevelPopup';
import PasswordPopupDialog from './resources/PasswordPopupDialog';
import { IHmsInput } from '../../common/hms-input/IHmsInput';

@Component({
  selector: 'password-input',
  templateUrl: 'password-input.component.html',
})
export default class PasswordInputComponent implements OnInit {
  @Input({transform: booleanAttribute}) applyRules = false
  @Input({transform: booleanAttribute}) isRequired = false
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  @ViewChild('') passwordInputRef?: ElementRef;
  passwordInput = new HmsInputControll({
    initialValue: '',
    type: 'password',
    icon: './../../../../../assets/icons/padlock.svg',
    placeholder: 'Digite sua senha',
    validators: [],
    updateOn: 'change',
  });

  validators: {[key: string]: IHmsInput.Validator<ValidatorFn>} = {
    minLength: {
      fn: Validators.minLength(8),
      key: 'minlength',
      message: 'Senha muito curta.',
    },
    shouldHaveNumbers: {
      fn: PasswordValidator.shouldHaveNumbers,
      key: PasswordErrors.shouldHaveNumbers,
      message: 'Senha fraca.',
    },
    shouldHaveLowerLetters: {
      fn: PasswordValidator.shouldHaveLowerLetters,
      key: PasswordErrors.shouldHaveLowerLetters,
      message: 'Senha fraca.',
    },
    shouldHaveUpperLetters: {
      fn: PasswordValidator.shouldHaveUpperLetters,
      key: PasswordErrors.shouldHaveUpperLetters,
      message: 'Senha fraca.',
    },
    shouldHavespecialCharacters: {
      fn: PasswordValidator.shouldHavespecialCharacters,
      key: PasswordErrors.shouldHavespecialCharacters,
      message: 'Senha fraca.',
    },
    required: {
      fn: Validators.required,
      key: 'required',
      message: 'Campo obrigatório.',
    },
  }

  controller = new PasswordPopupDialog();
  popup?: PopupModel<IRulesLevelPopup.Inputs, IRulesLevelPopup.Output>;
  inpurPasswordElement?: ElementRef;

  constructor(private popupController: PopupController) {}

  ngOnInit(): void {
    this.passwordInput.recoverNgControl((props) => {
      if(this.isRequired){
        this.passwordInput.addValidator(this.validators['required'])
      }
      if(this.applyRules){
        this.passwordInput.addValidator(this.validators['minLength'])
        this.passwordInput.addValidator(this.validators[PasswordErrors.shouldHaveNumbers])
        this.passwordInput.addValidator(this.validators[PasswordErrors.shouldHaveLowerLetters])
        this.passwordInput.addValidator(this.validators[PasswordErrors.shouldHaveUpperLetters])
        this.passwordInput.addValidator(this.validators[PasswordErrors.shouldHavespecialCharacters])
      }
      this.inputReady.emit(this.passwordInput);
      this.controller.setPasswordInput(props.control);
      this.atualizePasswordPopup();
      this.inpurPasswordElement = props.elementRef;
      this.createPopupPasswordLevel();
    });
    this.listenPasswordInputFocus();
  }

  listenPasswordInputFocus(): void {
    this.passwordInput.onFocus(() => {
      if (this.popup) {
        this.popup.present();
      }
    });
    this.passwordInput.onBlur(() => {
      if (this.popup) {
        this.popup.dismiss();
      }
    });
  }

  createPopupPasswordLevel(): void {
    if (this.inpurPasswordElement && this.applyRules) {
      this.popup = this.popupController
        .create<IRulesLevelPopup.Inputs, IRulesLevelPopup.Output>(
          RulesLevelPopupComponent
        )
        .setParent(this.inpurPasswordElement)
        .input({
          popupController: this.controller,
        })
        .output({
          handlePopupController: (next): void => {
            this.handleGetPasswordPopupController(
              next as IRulesLevelPopup.Controller
            );
          },
        })
        .position({
          right: 'calc(100% + 40px)',
          top: '0px',
        });

      this.popup.fix();
    }
  }

  atualizePasswordPopup(): void {
    const passwordInput = this.passwordInput.getNgControl();
    if (passwordInput) {
      passwordInput.valueChanges.subscribe(() => {
        const errorPoints = this.getNumberPasswordError();
        const completedProgressBar = this.controller.getProgressBar();
        if (typeof completedProgressBar == 'number') {
          if (errorPoints > completedProgressBar) {
            this.controller.changeProgress('add');
          } else if (errorPoints < completedProgressBar) {
            this.controller.changeProgress('remove');
          }
          if (completedProgressBar == 5) {
            setTimeout(() => this.handleHiddenPopup(), 500);
          }
        }
      });
    }
  }

  handleHiddenPopup(): void {
    this.controller.show = false;
  }

  handleGetPasswordPopupController(
    controller: IRulesLevelPopup.Controller
  ): void {
    this.controller.setPopupController(controller);
  }

  getNumberPasswordError(): number {
    let errorPoints = 5;
    const passwordInput = this.passwordInput.getNgControl();
    if (passwordInput) {
      [
        'minlength',
        PasswordErrors.shouldHaveNumbers,
        PasswordErrors.shouldHaveLowerLetters,
        PasswordErrors.shouldHaveUpperLetters,
        PasswordErrors.shouldHavespecialCharacters,
      ].forEach((errorName) => {
        if (passwordInput.errors?.[errorName]) {
          errorPoints--;
        }
      });
    }
    return errorPoints;
  }
}
