import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import ToastComponent from '../toast.component';
import { IToastComponent } from '../IToastComponent';
import { IToast } from '../../../../controllers/toast/IToast';
import ToastController from '../../../../controllers/toast/toast.controller';
import ToastControllerMock from '../../../../controllers/toast/ToastControllerMock.spec';
import { DebugElement } from '@angular/core';

export default class ToastComponentSpecHelper {
  component?: ToastComponent;
  toastControllerMock = new ToastControllerMock();
  toastController?: jasmine.SpyObj<ToastController>;
  fixture?: ComponentFixture<ToastComponent>;

  emitToast(): void {
    const toast = new IToast.ToastModel('message');
    toast.setType('success');
    if (this.toastController) {
      this.toastController.toastEvents$.next(toast);
      if (this.fixture) {
        this.fixture.detectChanges();
      }
    }
  }

  getToast(): DebugElement | void {
    if (this.fixture) {
      return this.fixture.debugElement.query(By.css('.toast-item'));
    }
  }

  getToastByTypeClass(
    typeClass: IToastComponent.itemClasses
  ): DebugElement | void {
    if (this.fixture) {
      return this.fixture.debugElement.query(
        By.css(`.toast-item.${typeClass}`)
      );
    }
  }
}
