import { progressBarActionType } from 'src/app/modules/login/components/register-conteiner/components/password-level-popup/resources/types/progressBarActionType';

export default interface PasswordPopupController {
  changeProgressBar: (type: progressBarActionType) => void;
  getProgressBar: () => number;
}
