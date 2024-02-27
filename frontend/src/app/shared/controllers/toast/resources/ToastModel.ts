import UuidGenerator from '../../../helpers/UuidGenerator';
import { Toast } from './IToastController';

export default class ToastModel {
  show = false;
  uuid: string;
  protected type?: Toast.toastType;
  constructor(public message: string) {
    this.uuid = UuidGenerator.generate();
  }
  setType(type: Toast.toastType): void {
    this.type = type;
  }
}
