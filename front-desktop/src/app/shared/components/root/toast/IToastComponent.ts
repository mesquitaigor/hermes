import { IToast } from '../../../controllers/toast/IToast';

export namespace IToastComponent {
  export type icons = 'success' | 'error' | 'warning' | 'info' | '';
  export type itemClasses =
    | 'toast-success'
    | 'toast-error'
    | 'toast-info'
    | 'toast-warning'
    | '';
  export type itemNgClass = { [key in itemClasses]?: boolean };
  export class RenderItem extends IToast.ToastModel {
    ngClass: itemNgClass = {};
    positionY = 0;
    positionX = 20;
    transition = '.5s ease-in-out'
    dragStartEvent?: DragEvent;
    dragEvent?: DragEvent;
    icon: icons = '';
    defineStyle(): void {
      this.defineIcon();
      this.defineClasses();
    }
    private defineIcon(): void {
      if (this.type == 'success') {
        this.icon = 'success';
      } else if (this.type == 'error') {
        this.icon = 'error';
      } else if (this.type == 'warning') {
        this.icon = 'warning';
      } else if (this.type == 'info') {
        this.icon = 'info';
      }
    }
    private defineClasses(): void {
      this.ngClass = {
        'toast-success': this.type === 'success',
        'toast-error': this.type === 'error',
        'toast-info': this.type === 'info',
        'toast-warning': this.type === 'warning',
      };
    }
  }
}
