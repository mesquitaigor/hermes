import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import HmsInputControll from 'src/app/shared/components/common/hms-input/resources/models/HmsInputControll';
import LoginPageService from '../../../../resources/login.page.service';
import { RegisterFormInputNames } from 'src/app/modules/login/resources/enums/RegisterFormInputNames';
import PasswordValidaton from 'src/app/shared/validators/PasswordValidation';
import PasswordLevelPopup from 'src/app/modules/login/components/register-conteiner/resources/models/PasswordLevelPopup';
import PasswordPopupController from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/interfaces/PasswordPopupController';

@Component({
  selector: 'register-password-input',
  templateUrl: 'register-password-input.component.html',
})
export default class RegisterPasswordInputComponent implements OnInit {
  lastNameInput = new HmsInputControll({
    initialValue: '',
    placeholder: 'Digite sua senha',
    validators: [
      {
        fn: Validators.required,
        key: 'required',
        message: 'Campo obrigatório.',
      },
      {
        fn: Validators.minLength(8),
        key: 'minlength',
        message: 'Senha muito curta.',
      },
      {
        fn: PasswordValidaton.shouldHaveNumbers,
        key: 'shouldHaveNumbers',
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHaveLowerLetters,
        key: 'shouldHaveLowerLetters',
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHaveUpperLetters,
        key: 'shouldHaveUpperLetters',
        message: 'Senha fraca.',
      },
      {
        fn: PasswordValidaton.shouldHavespecialCharacters,
        key: 'shouldHavespecialCharacters',
        message: 'Senha fraca.',
      },
    ],
    updateOn: 'change',
  });

  passwordLevelPopup = new PasswordLevelPopup();

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit() {
    this.lastNameInput.recoverNgControl((props) => {
      this.loginPageService.addControl(
        RegisterFormInputNames.PASSWORD,
        props.control
      );
      this.passwordLevelPopup.setPasswordInput(props.control);
      this.atualizePasswordPopup();
    });
  }

  atualizePasswordPopup() {
    const passwordInput = this.loginPageService.get(
      RegisterFormInputNames.PASSWORD
    );
    if (passwordInput) {
      passwordInput.valueChanges.subscribe(() => {
        const errorPoints = this.getNumberPasswordError();
        const completedProgressBar = this.passwordLevelPopup.getProgressBar();
        if (typeof completedProgressBar == 'number') {
          if (errorPoints > completedProgressBar) {
            this.passwordLevelPopup.changeProgress('add');
          } else if (errorPoints < completedProgressBar) {
            this.passwordLevelPopup.changeProgress('remove');
          }
          if (completedProgressBar == 5) {
            setTimeout(() => this.handleHiddenPopup(), 500);
          }
        }
      });
    }
  }

  handleShowPopup() {
    this.passwordLevelPopup.show = true;
  }

  handleHiddenPopup() {
    this.passwordLevelPopup.show = false;
  }

  handleGetPasswordPopupController(controller: PasswordPopupController) {
    this.passwordLevelPopup.setPopupController(controller);
  }

  getNumberPasswordError() {
    let errorPoints = 5;
    const passwordInput = this.loginPageService.get(
      RegisterFormInputNames.PASSWORD
    );
    if (passwordInput) {
      [
        'minlength',
        'shouldHaveNumbers',
        'shouldHaveLowerLetters',
        'shouldHaveUpperLetters',
        'shouldHavespecialCharacters',
      ].forEach((errorName) => {
        if (passwordInput.errors?.[errorName]) {
          errorPoints--;
        }
      });
    }
    return errorPoints;
  }
}
