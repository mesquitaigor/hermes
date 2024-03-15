import { BehaviorSubject } from 'rxjs';
import TestComponentGenericComponent from '../../../test/test-component-generic.component';
import PopupController from './popup.controller';
import { IPopupController } from './resources/IPopupController';

describe(PopupController.name, () => {
  let popupController: PopupController
  beforeEach(() => {
    popupController = new PopupController();
  })
  it('should create', () => {
    expect(popupController).toBeTruthy();
  })
  it('should create a new popup', () => {
    const popup = popupController.create(TestComponentGenericComponent);
    expect(popup).toBeTruthy();
  });
  it('should create a new popup with cold Observable', () => {
    const behavior = new BehaviorSubject<
      IPopupController.PopupBehaviorNext | undefined
    >(undefined)
    spyOn(behavior, 'next')
    popupController.popupStatus$ = behavior;  
    const popup = popupController.create(TestComponentGenericComponent);
    popup.present()
    expect(behavior.next).toHaveBeenCalled();
  })
})