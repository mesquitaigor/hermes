import { progressBarActionType } from '../types/progressBarActionType';

export default interface PasswordPopupController {
  changeProgressBar: (type: progressBarActionType) => void;
  getProgressBar: () => number;
}
