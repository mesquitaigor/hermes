import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IPopupController } from '@controllers/popup/resources/IPopupController';
import Popup from '@controllers/popup/Popup';

@Injectable({
  providedIn: 'root',
})
export default class PopupController {
  popupStatus$ = new BehaviorSubject<
    IPopupController.PopupBehaviorNext | undefined
  >(undefined);
  create<I, O>(
    element: Type<IPopupComponent.PopupChildComponent>
  ): Popup<I, O> {
    const popup = new Popup<I, O>(this.popupStatus$);
    popup.setElement(element);
    return popup;
  }
}
