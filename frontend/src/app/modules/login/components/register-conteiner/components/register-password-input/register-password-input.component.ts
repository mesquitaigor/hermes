import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from 'src/app/shared/components/common/hms-input/resources/models/HmsInputControll';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from 'src/app/modules/login/resources/enums/RegisterFormInputNames';
import PasswordValidaton from 'src/app/shared/validators/PasswordValidation';
import PasswordLevelPopup from 'src/app/modules/login/components/register-conteiner/resources/models/PasswordLevelPopup';
import PasswordPopupController from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordPopupController';
import PopupController from 'src/app/shared/controllers/popup/popup.controller';
import PasswordLevelPopupComponent from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/password-level-popup.component';
import Popup from 'src/app/shared/controllers/popup/resources/models/Popup';
import { passwordErrors } from 'src/app/shared/validators/passwordErrors';
import PopupInput from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordLevelPopupComponentInputs';
import PopupOutput from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordLevelPopupComponentOutputs';

@Component({
  selector: 'register-password-input',
  templateUrl: 'register-password-input.component.html',
})
export default class RegisterPasswordInputComponent implements OnInit {
  @ViewChild('') passwordInputRef?: ElementRef;
  passwordInput = new HmsInputControll({
    initialValue: '',
    type: 'password',
    placeholder: 'Digite sua senha',
    validators: [
      {
        fn: Validators.minLength(8),
        key: 'minlength',
        message: 'Senha muito curta.',
      },
      {
        fn: PasswordValidaton.shouldHaveNumbers,
        key: passwordErrors.shouldHaveNumbers,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHaveLowerLetters,
        key: passwordErrors.shouldHaveLowerLetters,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHaveUpperLetters,
        key: passwordErrors.shouldHaveUpperLetters,
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHavespecialCharacters,
        key: passwordErrors.shouldHavespecialCharacters,
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

  controller = new PasswordLevelPopup();
  popup?: Popup<PopupInput, PopupOutput>;
  inpurPasswordElement?: ElementRef;

  constructor(
    private loginPageService: LoginPageService,
    private popupController: PopupController
  ) {}

  ngOnInit(): void {
    this.passwordInput.recoverNgControl((props) => {
      this.loginPageService.addControl(
        RegisterFormInputNames.PASSWORD,
        props.control
      );
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
        .create<PopupInput, PopupOutput>(PasswordLevelPopupComponent)
        .setParent(this.inpurPasswordElement)
        .input({
          popupController: this.controller,
        })
        .output({
          handlePopupController: (next): void => {
            if (next) {
              this.handleGetPasswordPopupController(
                next as PasswordPopupController
              );
            }
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
    const passwordInput = this.loginPageService.get(
      RegisterFormInputNames.PASSWORD
    );
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

  handleGetPasswordPopupController(controller: PasswordPopupController): void {
    this.controller.setPopupController(controller);
  }

  getNumberPasswordError(): number {
    let errorPoints = 5;
    const passwordInput = this.loginPageService.get(
      RegisterFormInputNames.PASSWORD
    );
    if (passwordInput) {
      [
        'minlength',
        passwordErrors.shouldHaveNumbers,
        passwordErrors.shouldHaveLowerLetters,
        passwordErrors.shouldHaveUpperLetters,
        passwordErrors.shouldHavespecialCharacters,
      ].forEach((errorName) => {
        if (passwordInput.errors?.[errorName]) {
          errorPoints--;
        }
      });
    }
    return errorPoints;
  }
}
