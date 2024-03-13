import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IPopupController } from '@controllers/popup/resources/IPopupController';
import PopupModel from '@controllers/popup/resources/PopupModel';

@Injectable({
  providedIn: 'root',
})
export default class PopupController {
  popupStatus$ = new BehaviorSubject<
    IPopupController.PopupBehaviorNext | undefined
  >(undefined);
  create<I, O>(
    component: Type<IPopupComponent.PopupChildComponent>
  ): PopupModel<I, O> {
    const popup = new PopupModel<I, O>(this.popupStatus$);
    popup.setComponent(component);
    return popup;
  }
}
