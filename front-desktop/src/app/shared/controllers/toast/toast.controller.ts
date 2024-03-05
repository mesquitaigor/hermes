import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from './IToast';

@Injectable({
  providedIn: 'root',
})
export default class ToastController {
  toastEvents$ = new BehaviorSubject<IToast.ToastModel | undefined>(undefined);
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
  private dispachToast(message: string, type: IToast.type): void {
    const toast = new IToast.ToastModel(message);
    toast.setType(type);
    this.toastEvents$.next(toast);
  }
}
