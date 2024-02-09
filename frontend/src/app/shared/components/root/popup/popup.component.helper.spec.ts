import { ElementRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import PopupComponent from '@components/root/popup/popup.component';
import Popup from '@controllers/popup/Popup';
import PopupController from '@controllers/popup/popup.controller';
import TestComponentGenericComponent from '../../../test/generic/test-component-generic.component';

export default class PopupComponentHelperSpec {
  buildPopup(mockPopupController: PopupController): Popup<unknown, unknown> {
    const popup = new Popup(mockPopupController.popupStatus$!);
    popup.setElement(TestComponentGenericComponent);
    popup.setParent(new ElementRef(document.createElement('div')));
    return popup;
  }
  initComponentAndOpenPopup(
    mockPopupController: PopupController,
    component: PopupComponent
  ): Popup<unknown, unknown> {
    const popup = new Popup(mockPopupController.popupStatus$);
    component.ngOnInit();
    popup.present();
    return popup;
  }
  getChieldElement(
    fixture: ComponentFixture<PopupComponent>
  ): NodeListOf<HTMLElement> {
    const createdContent =
      fixture.elementRef.nativeElement.getElementsByClassName(
        'popup__content-box'
      )[0];
    return createdContent.getElementsByTagName(
      TestComponentGenericComponent.testComponentSelector
    );
  }
}
