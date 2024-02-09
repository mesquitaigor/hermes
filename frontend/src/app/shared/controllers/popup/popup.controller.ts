import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import PopupChildComponent from 'src/app/shared/components/root/popup/resources/interfaces/PopupChildComponent';
import PopupBehaviorNext from 'src/app/shared/controllers/popup/resources/interfaces/PopupBehaviorNext';
import Popup from 'src/app/shared/controllers/popup/resources/models/Popup';

@Injectable({
  providedIn: 'root',
})
export default class PopupController {
  popupStatus$ = new BehaviorSubject<PopupBehaviorNext | undefined>(undefined);
  create<I, O>(element: Type<PopupChildComponent>): Popup<I, O> {
    const popup = new Popup<I, O>(this.popupStatus$);
    popup.setElement(element);
    return popup;
  }
}
