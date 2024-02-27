import { Component } from '@angular/core';
import ToastController from '@controllers/toast/toast.controller';
import ToastRenderItem from './resources/models/ToastRenderItem';
import ToastModel from '../../../controllers/toast/resources/ToastModel';

@Component({
  selector: 'toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss'],
})
export default class ToastComponent {
  toasts: Array<ToastRenderItem> = [];
  constructor(private toastController: ToastController) {
    this.toastController.toastEvents$.subscribe((next) => {
      if (next) {
        const resultMerge = Object.assign(
          new ToastRenderItem(next.message),
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

  handleCloseToast(toast: ToastRenderItem): void {
    toast.show = false;
    setTimeout(() => {
      const toastsUuid = this.toasts.map((toast) => toast.uuid);
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