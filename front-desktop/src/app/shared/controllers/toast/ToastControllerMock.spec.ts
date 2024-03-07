import { BehaviorSubject } from 'rxjs';
import ServiceMock from '../../../test/ServiceMock.spec';
import ToastController from './toast.controller';
import { IToast } from './IToast';

export default class ToastControllerMock extends ServiceMock<ToastController> {
  build(): jasmine.SpyObj<ToastController> {
    const mock: jasmine.SpyObj<ToastController> = jasmine.createSpyObj(
      ToastController.name,
      ['toastEvents$']
    );
    mock.toastEvents$ = new BehaviorSubject<IToast.ToastModel | undefined>(
      undefined
    );
    return mock;
  }
}
