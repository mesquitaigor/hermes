import { ElementRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import UuidGenerator from '@helpers/UuidGenerator';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IPopupController } from './IPopupController';

export default class PopupModel<I, O> {
  private _position: IPopupController.PopupPosition = {
    top: '0px',
    left: '0px',
  };
  private _parent?: ElementRef;
  private _element?: Type<IPopupComponent.PopupChildComponent>;
  private _outputList?: IPopupController.popupComponentOutputs<O>;
  private _inputList?: Partial<I>;
  private uuid: string;
  constructor(
    private behavior: BehaviorSubject<
      IPopupController.PopupBehaviorNext | undefined
    >
  ) {
    this.uuid = UuidGenerator.generate();
  }

  setElement(element: Type<IPopupComponent.PopupChildComponent>): this {
    this._element = element;
    return this;
  }

  output(outputList: IPopupController.popupComponentOutputs<O>): this {
    this._outputList = outputList;
    return this;
  }

  input(inputList: Partial<I>): this {
    this._inputList = inputList;
    return this;
  }

  setParent(parent: ElementRef): this {
    this._parent = parent;
    return this;
  }

  getUuid(): string {
    return this.uuid;
  }

  get element(): Type<IPopupComponent.PopupChildComponent> | undefined {
    return this._element;
  }

  get parent(): ElementRef | undefined {
    return this._parent;
  }

  get childOutputList(): IPopupController.popupComponentOutputs<O> | undefined {
    return this._outputList;
  }

  get childInputList(): Partial<I> | undefined {
    return this._inputList;
  }

  position(pos: IPopupController.PopupPosition): this {
    this._position = pos;
    return this;
  }

  getPosition(): IPopupController.PopupPosition {
    return this._position;
  }

  present(): void {
    this.behavior.next({ popup: this, action: 'present' });
  }

  dismiss(): void {
    this.behavior.next({ popup: this, action: 'dismiss' });
  }

  fix(): void {
    this.behavior.next({ popup: this, action: 'fix' });
  }
}
