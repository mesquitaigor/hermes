import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './resources/Toast';
import ToastModel from './resources/ToastModel';

@Injectable({
  providedIn: 'root',
})
export default class ToastController {
  toastEvents$ = new BehaviorSubject<ToastModel | undefined>(undefined);
  success(message: string): void {
    this.dispachToast(message, 'success');
  }
  error(message: string): void {
    this.dispachToast(message, 'error');
  }
  info(message: string): void {
    this.dispachToast(message, 'info');
  }
  warning(message: string): void {
    this.dispachToast(message, 'warning');
  }
  private dispachToast(message: string, type: Toast.toastType): void {
    const toast = new ToastModel(message);
    toast.setType(type);
    this.toastEvents$.next(toast);
  }
}
