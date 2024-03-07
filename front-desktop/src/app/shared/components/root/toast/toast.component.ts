import { Component } from '@angular/core';
import ToastController from '@controllers/toast/toast.controller';
import { IToastComponent } from './IToastComponent';

@Component({
  selector: 'toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
})
export default class ToastComponent {
  toasts: Array<IToastComponent.RenderItem> = [];
  constructor(private toastController: ToastController) {
    this.toastController.toastEvents$.subscribe((next) => {
      if (next) {
        const resultMerge: IToastComponent.RenderItem = Object.assign(
          new IToastComponent.RenderItem(next.message),
          next
        );
        resultMerge.defineStyle();
        this.toasts.push(resultMerge);
        this.redefineToastPosition();
        setTimeout(() => {
          resultMerge.show = true;
          setTimeout(() => {
            resultMerge.show = false;
            setTimeout(() => {
              this.toasts.shift();
              this.redefineToastPosition();
            }, 300);
          }, 30000);
        }, 50);
      }
    });
  }

  handleCloseToast(toast: IToastComponent.RenderItem): void {
    toast.show = false;
    setTimeout(() => {
      const toastsUuid = this.toasts.map((toastItem) => toastItem.uuid);
      const targetToastIndex = toastsUuid.indexOf(toast.uuid);
      this.toasts.splice(targetToastIndex, 1);
      this.redefineToastPosition();
    }, 300);
  }

  redefineToastPosition(): void {
    this.toasts.forEach((toast, index) => {
      toast.positionY = 100 * index + 20;
    });
  }
}
