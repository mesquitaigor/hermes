import UuidGenerator from '../../helpers/UuidGenerator';

export namespace IToast {
  export type type = 'success' | 'error' | 'warning' | 'info';
  export class ToastModel {
    show = false;
    uuid: string;
    protected type?: IToast.type;
    constructor(public message: string) {
      this.uuid = UuidGenerator.generate();
    }
    setType(type: IToast.type): void {
      this.type = type;
    }
  }
}
