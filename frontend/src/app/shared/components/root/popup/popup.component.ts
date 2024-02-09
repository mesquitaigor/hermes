import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  OnInit,
  QueryList,
  Type,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/shared/components/root/popup/dynamic-child-loader.directive';
import PopupChildComponent from 'src/app/shared/components/root/popup/resources/interfaces/PopupChildComponent';
import PopupController from 'src/app/shared/controllers/popup/popup.controller';
import Popup from 'src/app/shared/controllers/popup/resources/models/Popup';

interface PopupRenderItem {
  contentStyle: ContentStyle;
  boxStyle: BoxStyle;
  show: boolean;
  uuid: string;
}
interface ContentStyle {
  top: string;
  left: string;
  height: string;
  width: string;
}
interface BoxStyle {
  left: string;
  right: string;
  top: string;
  bottom: string;
  height: string;
  width: string;
}

@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
})
export default class PopupComponent implements OnInit {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChild?: QueryList<DynamicChildLoaderDirective>;

  list: Array<PopupRenderItem> = [];

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
          } else if (next.action == 'dismiss') {
            renderItem.show = false;
          }
        }
      }
    });
  }

  verifyIfExistingAndCreate(
    popup: Popup<unknown, unknown>
  ): PopupRenderItem | undefined {
    const renderedUuids = this.list.map((item) => item.uuid);
    if (renderedUuids.length == 0 || !renderedUuids.includes(popup.getUuid())) {
      this.createRenderPopupItem(popup.getUuid());
      this.createPopup(popup);
    }
    return this.getRenderItem(popup.getUuid());
  }

  getRenderItem(uuid: string): PopupRenderItem | undefined {
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

  createPopup(popup: Popup<unknown, unknown>): void {
    this.defineAnchor(popup);
    this.definePopupPosition(popup);
    this.loadDynamicComponent(popup);
  }

  definePopupPosition(popup: Popup<unknown, unknown>): void {
    const popupPosition = popup.getPosition();
    const renderItem = this.getRenderItem(popup.getUuid());
    if (renderItem) {
      renderItem.boxStyle.left = popupPosition.left || '';
      renderItem.boxStyle.right = popupPosition.right || '';
      renderItem.boxStyle.top = popupPosition.top || '';
      renderItem.boxStyle.bottom = popupPosition.bottom || '';
    }
  }

  defineAnchor(popup: Popup<unknown, unknown>): void {
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

  loadDynamicComponent(popup: Popup<unknown, unknown>): void {
    const element: Type<PopupChildComponent> | undefined = popup.element;
    this.changeDetectorRef.detectChanges();
    if (element && this.dynamicChild) {
      const childElements = this.dynamicChild.toArray();
      const renderItem = this.getRenderItem(popup.getUuid());
      const content = childElements.find(
        (element) => element.uuid == renderItem?.uuid
      );
      if (content) {
        const componentRef: ComponentRef<PopupChildComponent> =
          content.viewContainerRef.createComponent(element);
        this.stilizeHost(componentRef);
        this.atribuiteDefinitions(popup, componentRef);
        this.listenOutputs(popup, componentRef);
        this.setChildComponentInputs(popup, componentRef);
      }
    }
  }

  setChildComponentInputs(
    popup: Popup<unknown, unknown>,
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
    popup: Popup<unknown, unknown>,
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

  atribuiteDefinitions(
    popup: Popup<unknown, unknown>,
    componentRef: ComponentRef<PopupChildComponent>
  ): void {
    if (componentRef.instance.popupDefinitions) {
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
  }

  stilizeHost(componentRef: ComponentRef<PopupChildComponent>): void {
    const nativeElement = componentRef.location.nativeElement;
    nativeElement.style.display = 'inline-block';
    nativeElement.style.width = '100%';
    nativeElement.style.height = '100%';
  }
}
