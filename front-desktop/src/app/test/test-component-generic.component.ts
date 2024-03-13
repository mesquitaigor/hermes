import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';

const testComponentSelector = 'test-component-generic';

@Component({
  selector: testComponentSelector,
  template: '<div>Test Component</div>',
})
export default class TestComponentGenericComponent
  implements IPopupComponent.PopupChildComponent
{
  @Input() test = 0;
  @Output() testOutput = new EventEmitter();
  static testComponentSelector = testComponentSelector;
  popupDefinitions: IPopupComponent.PopupChildDefinitions = {};
}
