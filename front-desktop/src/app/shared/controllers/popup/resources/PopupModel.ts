import { ElementRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import UuidGenerator from '@helpers/UuidGenerator';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import { IPopupController } from './IPopupController';

export default class PopupModel<I, O> {
  openned = false
  private _position: IPopupController.PopupPosition = {
    top: '0px',
    left: '0px',
  };
  private _parent?: ElementRef;
  private _component?: Type<IPopupComponent.PopupChildComponent>;
  private _outputList?: IPopupController.popupComponentOutputs<O>;
  private _inputList?: Partial<I>;
  private _popupBoxElement?: ElementRef<HTMLDivElement>;
  private _enterAnimation?: (element: ElementRef<HTMLDivElement>) => void;
  private _uuid: string;

  constructor(
    private behavior: BehaviorSubject<
      IPopupController.PopupBehaviorNext | undefined
    >
  ) {
    this._uuid = UuidGenerator.generate();
  }

  setComponent(element: Type<IPopupComponent.PopupChildComponent>): this {
    this._component = element;
    return this;
  }

  enterAnimation(animationFn: (element: ElementRef<HTMLDivElement>) => void): this{
    this._enterAnimation = animationFn;
    return this
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

  setPopupBoxElement(popupBoxElement: ElementRef<HTMLDivElement>): void{
    this._popupBoxElement = popupBoxElement;
  }

  displayEnterAnimation(): void{
    if(this._popupBoxElement && this._enterAnimation){
      this._enterAnimation(this._popupBoxElement)
    }
  }

  isOpened(): boolean{
    return this.openned
  }

  getUuid(): string {
    return this._uuid;
  }

  get component(): Type<IPopupComponent.PopupChildComponent> | undefined {
    return this._component;
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
