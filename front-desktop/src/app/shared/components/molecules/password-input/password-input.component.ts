import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import HmsInputControll from '@components/common/hms-input/HmsInputControll';
import { Validators } from '@angular/forms';
import PasswordValidator from '@validators/password-validator/PasswordValidatior';
import { PasswordErrors } from '@validators/password-validator/PasswordErrors';
import PopupModel from '@controllers/popup/resources/PopupModel';
import PopupController from '@controllers/popup/popup.controller';
import PasswordLevelPopupComponent from '../password-level-popup/password-level-popup.component';
import { IPasswordLevelPopup } from '../password-level-popup/IPasswordLevelPopup';

@Component({
  selector: 'password-input',
  templateUrl: 'password-input.component.html',
})
export default class PasswordInputComponent implements OnInit {
  @Output() inputReady = new EventEmitter<HmsInputControll>();
  @ViewChild('') passwordInputRef?: ElementRef;
  passwordInput = new HmsInputControll({
    initialValue: '',
    type: 'password',
    icon: './../../../../../assets/icons/padlock.svg',
    placeholder: 'Digite sua senha',
    validators: [
      {
        fn: Validators.minLength(8),
        key: 'minlength',
        message: 'Senha muito curta.',
      },
      {
        fn: PasswordValidator.shouldHaveNumbers,
        key: PasswordErrors.shouldHaveNumbers,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidator.shouldHaveLowerLetters,
        key: PasswordErrors.shouldHaveLowerLetters,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidator.shouldHaveUpperLetters,
        key: PasswordErrors.shouldHaveUpperLetters,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidator.shouldHavespecialCharacters,
        key: PasswordErrors.shouldHavespecialCharacters,
        message: 'Senha fraca.',
      },
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
    ],
    updateOn: 'change',
  });

  controller = new IPasswordLevelPopup.PasswordLevelPopup();
  popup?: PopupModel<IPasswordLevelPopup.Inputs, IPasswordLevelPopup.Output>;
  inpurPasswordElement?: ElementRef;

  constructor(private popupController: PopupController) {}

  ngOnInit(): void {
    this.passwordInput.recoverNgControl((props) => {
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
    if (this.inpurPasswordElement) {
      this.popup = this.popupController
        .create<IPasswordLevelPopup.Inputs, IPasswordLevelPopup.Output>(
          PasswordLevelPopupComponent
        )
        .setParent(this.inpurPasswordElement)
        .input({
          popupController: this.controller,
        })
        .output({
          handlePopupController: (next): void => {
            this.handleGetPasswordPopupController(
              next as IPasswordLevelPopup.Controller
            );
          },
        })
        .position({
          left: 'calc(90% + 40px)',
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

  handleShowPopup(): void {
    this.controller.show = true;
  }

  handleHiddenPopup(): void {
    this.controller.show = false;
  }

  handleGetPasswordPopupController(
    controller: IPasswordLevelPopup.Controller
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
