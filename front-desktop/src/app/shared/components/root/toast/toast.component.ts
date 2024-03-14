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
        const toastRender: IToastComponent.RenderItem = Object.assign(
          new IToastComponent.RenderItem(next.message),
          next
        );
        toastRender.defineStyle();
        this.toasts.push(toastRender);
        this.redefineToastPosition();
        setTimeout(() => {
          toastRender.show = true;
          setTimeout(() => {
            this.dismissToast(toastRender)
          }, 30000);
        }, 50);
      }
    });
  }

  dismissToast(renderedToast: IToastComponent.RenderItem): void{
    renderedToast.show = false;
    setTimeout(() => {
      this.toasts.shift();
      this.redefineToastPosition();
    }, 300);
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

  handleDragstartToast(dragStart: DragEvent, toast: IToastComponent.RenderItem): void{
    dragStart.dataTransfer?.setDragImage(new Image(), 0, 0);
    toast.dragStartEvent = dragStart
  }

  handleDragToast(drag: DragEvent, toast: IToastComponent.RenderItem): void{
    if(drag.clientX != 0 && drag.screenX != 0){
      toast.dragEvent = drag
      toast.transition = '0s ease-in-out'
      if(toast.dragStartEvent?.x){
        let positionX = toast.dragStartEvent.x - toast.dragEvent.x
        if(positionX < 50 && positionX > -100){
          toast.positionX = positionX
        }else if(positionX < -100){
          toast.positionX = -100
        }else{
          toast.positionX = 50
        }
      }
    }
  }

  handleDragendToast(toast: IToastComponent.RenderItem): void{
    toast.dragStartEvent = undefined
    toast.transition = '0.5s ease-in-out'
    if(toast.positionX < -20){
      this.dismissToast(toast)
    }else{
      toast.positionX = 20
    }
  }

  redefineToastPosition(): void {
    this.toasts.forEach((toast, index) => {
      toast.positionY = 100 * index + 20;
    });
  }
}
