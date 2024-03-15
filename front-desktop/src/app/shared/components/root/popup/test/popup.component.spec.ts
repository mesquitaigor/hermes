import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import PopupComponent from '@components/root/popup/popup.component';
import { IPopupController } from '@controllers/popup/resources/IPopupController';
import PopupModel from '@controllers/popup/resources/PopupModel';
import PopupController from '@controllers/popup/popup.controller';
import PopupComponentModule from '../popup.component.module';
import TestComponentGenericComponent from '../../../../../test/test-component-generic.component';
import PopupComponentHelperSpec from './popup.component.helper.spec';

describe(PopupComponent.name, () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let mockPopupController: PopupController;
  const componentSpecHelper = new PopupComponentHelperSpec();
  beforeEach(() => {
    mockPopupController = jasmine.createSpyObj(PopupController.name, [
      'popupStatus$',
    ]);
    mockPopupController.popupStatus$ = new BehaviorSubject<
      IPopupController.PopupBehaviorNext | undefined
    >(undefined);

    TestBed.configureTestingModule({
      providers: [{ provide: PopupController, useValue: mockPopupController }],
      imports: [PopupComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe in controller on init', () => {
    const subscribespy = spyOn(mockPopupController.popupStatus$, 'subscribe');
    component.ngOnInit();
    expect(subscribespy).toHaveBeenCalled();
  });

  it('should verify if existing and create when controller emit a event and have a popup', () => {
    const targetMethodSpy = spyOn(component, 'verifyIfExistingAndCreate');
    componentSpecHelper.initComponentAndOpenPopup(
      mockPopupController,
      component
    );
    expect(targetMethodSpy).toHaveBeenCalled();
  });

  it('should create a new popup if dont existing one', () => {
    const targetMethodSpy1 = spyOn(component, 'createRenderPopupItem');
    const targetMethodSpy2 = spyOn(component, 'createPopup');
    componentSpecHelper.initComponentAndOpenPopup(
      mockPopupController,
      component
    );
    expect(targetMethodSpy1).toHaveBeenCalled();
    expect(targetMethodSpy2).toHaveBeenCalled();
  });

  it('should not create a new popup if it exist', () => {
    //Open first time
    const popup = componentSpecHelper.initComponentAndOpenPopup(
      mockPopupController,
      component
    );
    const targetMethodSpy1 = spyOn(component, 'createRenderPopupItem');
    const targetMethodSpy2 = spyOn(component, 'createPopup');
    //open second time
    popup.present();
    expect(targetMethodSpy1).not.toHaveBeenCalled();
    expect(targetMethodSpy2).not.toHaveBeenCalled();
  });

  it(`should define popup's anchor if it will be present`, () => {
    const targetMethodSpy = spyOn(component, 'defineAnchor');
    componentSpecHelper.initComponentAndOpenPopup(
      mockPopupController,
      component
    );
    expect(targetMethodSpy).toHaveBeenCalled();
  });

  it(`should show popup if it will be present`, () => {
    const popup = new PopupModel(mockPopupController.popupStatus$);
    component.ngOnInit();
    popup.fix();
    const renderItem = component.list[0];
    if (!renderItem.show) {
      popup.present();
      expect(renderItem.show).toBeTrue();
    } else {
      fail('Popup is already open');
    }
  });

  it(`should close popup if it will be dismiss`, () => {
    const popup = componentSpecHelper.initComponentAndOpenPopup(
      mockPopupController,
      component
    );
    const renderItem = component.list[0];
    if (renderItem.show) {
      popup.dismiss();
      expect(renderItem.show).toBeFalse();
    } else {
      fail('Popup is already not open');
    }
  });

  describe(PopupComponent.prototype.verifyIfExistingAndCreate.name, () => {
    it(`should return the created popup`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      const createdRenderItem = component.verifyIfExistingAndCreate(popup);
      expect(createdRenderItem?.uuid).toEqual(popup.getUuid());
    });
  });

  describe(PopupComponent.prototype.getRenderItem.name, () => {
    it(`should return target popup`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      popup.present();
      const createdRenderItem = component.getRenderItem(popup.getUuid());
      expect(createdRenderItem?.uuid).toEqual(popup.getUuid());
    });
  });

  describe(PopupComponent.prototype.createRenderPopupItem.name, () => {
    it(`should add a new item to renderize when is called`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      component.createRenderPopupItem(popup.getUuid());
      expect(component.list.length).toEqual(1);
    });
  });

  describe(PopupComponent.prototype.createPopup.name, () => {
    it(`should define popup anchor when need to create a popup`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      const spyMethod = spyOn(component, 'defineAnchor');
      component.createPopup(popup);
      expect(spyMethod).toHaveBeenCalled();
    });
    it(`should define popup position when need to create a popup`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      const spyMethod = spyOn(component, 'definePopupPosition');
      component.createPopup(popup);
      expect(spyMethod).toHaveBeenCalled();
    });
    it(`should render child element when need to create a popup`, () => {
      const popup = new PopupModel(mockPopupController.popupStatus$);
      const spyMethod = spyOn(component, 'loadDynamicComponent');
      component.createPopup(popup);
      expect(spyMethod).toHaveBeenCalled();
    });
  });

  describe(PopupComponent.prototype.defineAnchor.name, () => {
    it(`should need a parent element to define anchor`, () => {
      const popup: PopupModel<unknown, unknown> = new PopupModel(
        mockPopupController.popupStatus$
      );
      component.createRenderPopupItem(popup.getUuid());
      component.defineAnchor(popup);
      expect(component.list[0].contentStyle).toEqual({
        top: '0px',
        left: '0px',
        height: '0px',
        width: '0px',
      });
    });
    it(`should define anchor equal parant's rect values`, () => {
      const popup: PopupModel<unknown, unknown> = new PopupModel(
        mockPopupController.popupStatus$
      );
      popup.setParent(new ElementRef(document.createElement('div')));
      component.createRenderPopupItem(popup.getUuid());
      component.defineAnchor(popup);
      const renderedItem = component.getRenderItem(popup.getUuid());
      const parentRect = popup.parent?.nativeElement.getBoundingClientRect();
      expect(renderedItem?.contentStyle.height).toEqual(
        `${parentRect.height}px`
      );
      expect(renderedItem?.contentStyle.width).toEqual(`${parentRect.width}px`);
      expect(renderedItem?.contentStyle.left).toEqual(`${parentRect.x}px`);
      expect(renderedItem?.contentStyle.top).toEqual(`${parentRect.y}px`);
    });
  });
  describe(PopupComponent.prototype.loadDynamicComponent.name, () => {
    let popup: PopupModel<unknown, unknown>;
    beforeEach(() => {
      popup = componentSpecHelper.buildPopup(mockPopupController);
    });
    it(`should define default style in chield host element`, () => {
      const spyMethod = spyOn(component, 'stilizeHost');
      popup.present();
      expect(spyMethod).toHaveBeenCalled();
    });
    it(`should assign child component style props into its rendered item`, () => {
      const spyMethod = spyOn(component, 'assignDefinitions');
      popup.present();
      expect(spyMethod).toHaveBeenCalled();
    });
    it(`should listen chield element's output when it is created`, () => {
      const spyMethod = spyOn(component, 'listenOutputs');
      popup.present();
      expect(spyMethod).toHaveBeenCalled();
    });

    it(`should define chield element's input when it is created`, () => {
      const spyMethod = spyOn(component, 'setChildComponentInputs');
      popup.present();
      expect(spyMethod).toHaveBeenCalled();
    });
  });
  describe(PopupComponent.prototype.stilizeHost.name, () => {
    it(`should stylize host element chield`, () => {
      let popup = componentSpecHelper.buildPopup(mockPopupController);
      popup.present();
      fixture.detectChanges();
      const childElement = componentSpecHelper.getChieldElement(fixture);
      const childStyle = childElement[0].style;
      expect(childStyle.display).toBeTruthy();
      expect(childStyle.width).toBeTruthy();
      expect(childStyle.height).toBeTruthy();
    });
  });
  describe(PopupComponent.prototype.setChildComponentInputs.name, () => {
    it(`should define child element inputs`, () => {
      let popup = componentSpecHelper.buildPopup(mockPopupController);
      const inputValueTest = 2;
      popup.input({
        test: inputValueTest,
      });
      popup.present();
      const inputCurrentValue = fixture.debugElement.query(
        By.css(TestComponentGenericComponent.testComponentSelector)
      ).componentInstance;
      expect(inputCurrentValue.test).toEqual(inputValueTest);
    });
  });
  describe(PopupComponent.prototype.listenOutputs.name, () => {
    it(`should listen child outputs`, () => {
      let popup = componentSpecHelper.buildPopup(mockPopupController);
      const outputSpy = jasmine.createSpy();
      popup.output({
        testOutput: outputSpy,
      });
      popup.present();
      const childInstance: TestComponentGenericComponent =
        fixture.debugElement.query(
          By.css(TestComponentGenericComponent.testComponentSelector)
        ).componentInstance;
      childInstance.testOutput.emit();
      expect(outputSpy).toHaveBeenCalled();
    });
  });
});
