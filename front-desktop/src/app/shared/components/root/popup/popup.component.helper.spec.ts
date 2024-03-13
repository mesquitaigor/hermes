import { ElementRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import PopupComponent from '@components/root/popup/popup.component';
import PopupModel from '@controllers/popup/resources/PopupModel';
import PopupController from '@controllers/popup/popup.controller';
import TestComponentGenericComponent from '../../../../test/test-component-generic.component';

export default class PopupComponentHelperSpec {
  buildPopup(
    mockPopupController: PopupController
  ): PopupModel<unknown, unknown> {
    const popup = new PopupModel(mockPopupController.popupStatus$!);
    popup.setComponent(TestComponentGenericComponent);
    popup.setParent(new ElementRef(document.createElement('div')));
    return popup;
  }
  initComponentAndOpenPopup(
    mockPopupController: PopupController,
    component: PopupComponent
  ): PopupModel<unknown, unknown> {
    const popup = new PopupModel(mockPopupController.popupStatus$);
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
