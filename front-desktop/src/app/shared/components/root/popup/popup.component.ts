import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import PopupController from '@controllers/popup/popup.controller';
import PopupModel from '@controllers/popup/resources/PopupModel';
import { DynamicChildLoaderDirective } from '@directives/dynamic-child-loader/dynamic-child-loader.directive';
import { IPopupComponent } from './IPopupComponent';

@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
})
export default class PopupComponent implements OnInit {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChild?: QueryList<DynamicChildLoaderDirective>;

  @ViewChild('contentBox')
  contentBox?: ElementRef<HTMLDivElement>;

  list: Array<IPopupComponent.PopupRenderItem> = [];

  constructor(
    private popupController: PopupController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.popupController.popupStatus$.subscribe((next) => {
      if (next?.popup) {
        const renderItem = this.verifyIfExistingAndCreate(next.popup);
        if (renderItem) {
          if (next.action == 'present') {
            this.defineAnchor(next.popup);
            renderItem.show = true;
            next.popup.openned = true;
            next.popup.displayEnterAnimation();
          } else if (next.action == 'dismiss') {
            renderItem.show = false;
            next.popup.openned = false;
          }
        }
      }
    });
  }

  verifyIfExistingAndCreate(
    popup: PopupModel<unknown, unknown>
  ): IPopupComponent.PopupRenderItem | undefined {
    const renderedUuids = this.list.map((item) => item.uuid);
    if (renderedUuids.length == 0 || !renderedUuids.includes(popup.getUuid())) {
      this.createRenderPopupItem(popup.getUuid());
      this.createPopup(popup);
    }
    return this.getRenderItem(popup.getUuid());
  }

  getRenderItem(uuid: string): IPopupComponent.PopupRenderItem | undefined {
    return this.list.find((item) => item.uuid == uuid);
  }

  createRenderPopupItem(uuid: string): void {
    this.list.push({
      contentStyle: {
        top: '0px',
        left: '0px',
        height: '0px',
        width: '0px',
      },
      boxStyle: {
        left: '',
        right: '',
        top: '',
        bottom: '',
        height: '',
        width: '',
      },
      show: false,
      uuid,
    });
  }

  createPopup(popup: PopupModel<unknown, unknown>): void {
    this.defineAnchor(popup);
    this.definePopupPosition(popup);
    this.loadDynamicComponent(popup);
  }

  definePopupPosition(popup: PopupModel<unknown, unknown>): void {
    const popupPosition = popup.getPosition();
    const renderItem = this.getRenderItem(popup.getUuid());
    if (renderItem) {
      renderItem.boxStyle.left = popupPosition.left || '';
      renderItem.boxStyle.right = popupPosition.right || '';
      renderItem.boxStyle.top = popupPosition.top || '';
      renderItem.boxStyle.bottom = popupPosition.bottom || '';
    }
  }

  defineAnchor(popup: PopupModel<unknown, unknown>): void {
    if (popup.parent) {
      const renderItem = this.getRenderItem(popup.getUuid());
      const parentRect = popup.parent.nativeElement.getBoundingClientRect();
      if (renderItem) {
        renderItem.contentStyle.left = `${parentRect.x}px`;
        renderItem.contentStyle.top = `${parentRect.y}px`;
        renderItem.contentStyle.width = `${parentRect.width}px`;
        renderItem.contentStyle.height = `${parentRect.height}px`;
      }
    }
  }

  loadDynamicComponent(popup: PopupModel<unknown, unknown>): void {
    const element: Type<IPopupComponent.PopupChildComponent> | undefined =
      popup.component;
    this.changeDetectorRef.detectChanges();
    if (element && this.dynamicChild) {
      const childElements = this.dynamicChild.toArray();
      const renderItem = this.getRenderItem(popup.getUuid());
      const content = childElements.find(
        (childElement) => childElement.uuid == renderItem?.uuid
      );
      if (content) {
        const componentRef: ComponentRef<IPopupComponent.PopupChildComponent> =
          content.viewContainerRef.createComponent(element);
        if(this.contentBox){
          popup.setPopupBoxElement(this.contentBox);
        }
        this.stilizeHost(componentRef);
        this.assignDefinitions(popup, componentRef);
        this.listenOutputs(popup, componentRef);
        this.setChildComponentInputs(popup, componentRef);
        componentRef.instance.popupDefinitions.dismiss = (): void => {
          popup.dismiss();
        }
      }
    }
  }

  setChildComponentInputs(
    popup: PopupModel<unknown, unknown>,
    componentRef: ComponentRef<unknown>
  ): void {
    if (popup.childInputList) {
      const inputNames = Object.keys(popup.childInputList);
      if (inputNames.length) {
        inputNames.forEach((inputKey) => {
          const componentIntance = componentRef.instance as {
            [key: string]: unknown;
          };
          const chieldInputs = popup.childInputList as {
            [key: string]: unknown;
          };
          componentIntance[inputKey] = chieldInputs[inputKey];
        });
      }
    }
  }

  listenOutputs(
    popup: PopupModel<unknown, unknown>,
    componentRef: ComponentRef<unknown>
  ): void {
    if (popup.childOutputList) {
      const outputNames = Object.keys(popup.childOutputList);
      if (outputNames.length) {
        outputNames.forEach((outputKey) => {
          const output = (
            componentRef.instance as { [key: string]: BehaviorSubject<unknown> }
          )[outputKey];
          output.subscribe((next) => {
            (
              popup.childOutputList as {
                [key: string]: (next: unknown) => void;
              }
            )[outputKey](next);
          });
        });
      }
    }
  }

  assignDefinitions(
    popup: PopupModel<unknown, unknown>,
    componentRef: ComponentRef<IPopupComponent.PopupChildComponent>
  ): void {
    const style = componentRef.instance.popupDefinitions.style;
    const renderItem = this.getRenderItem(popup.getUuid());
    if (renderItem) {
      if (style?.width) {
        renderItem.boxStyle.width = style.width;
      }
      if (style?.height) {
        renderItem.boxStyle.height = style.height;
      }
    }
  }

  stilizeHost(
    componentRef: ComponentRef<IPopupComponent.PopupChildComponent>
  ): void {
    const nativeElement = componentRef.location.nativeElement;
    nativeElement.style.display = 'inline-block';
    nativeElement.style.width = '100%';
    nativeElement.style.height = '100%';
  }
}
