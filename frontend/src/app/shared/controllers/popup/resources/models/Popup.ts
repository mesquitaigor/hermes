import { ElementRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import PopupChildComponent from 'src/app/shared/components/root/popup/resources/interfaces/PopupChildComponent';
import PopupBehaviorNext from 'src/app/shared/controllers/popup/resources/interfaces/PopupBehaviorNext';
import PopupPosition from 'src/app/shared/controllers/popup/resources/interfaces/PopupPosition';
import { popupComponentOutputs } from 'src/app/shared/controllers/popup/resources/types/popupComponentOutputs';
import UuidGenerator from 'src/app/shared/helpers/UuidGenerator';

export default class Popup<I, O> {
  private _position: PopupPosition = { top: '0px', left: '0px' };
  private _parent?: ElementRef;
  private _element?: Type<PopupChildComponent>;
  private _outputList?: popupComponentOutputs<O>;
  private _inputList?: Partial<I>;
  private uuid: string;
  constructor(
    private behavior: BehaviorSubject<PopupBehaviorNext | undefined>
  ) {
    this.uuid = UuidGenerator.generate();
  }

  setElement(element: Type<PopupChildComponent>): this {
    this._element = element;
    return this;
  }

  output(outputList: popupComponentOutputs<O>): this {
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

  get element(): Type<PopupChildComponent> | undefined {
    return this._element;
  }

  get parent(): ElementRef | undefined {
    return this._parent;
  }

  get childOutputList(): popupComponentOutputs<O> | undefined {
    return this._outputList;
  }

  get childInputList(): Partial<I> | undefined {
    return this._inputList;
  }

  position(pos: PopupPosition): this {
    this._position = pos;
    return this;
  }

  getPosition(): PopupPosition {
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
