import { EventEmitter } from '@angular/core';
import Popup from './Popup';

export namespace IPopupController {
  export interface PopupBehaviorNext {
    popup?: Popup<unknown, unknown>;
    action: 'present' | 'fix' | 'dismiss';
  }
  export type popupComponentOutputs<O> = {
    [K in keyof O]: (
      next: O[K] extends EventEmitter<infer T> ? T : never
    ) => void;
  };
  export interface PopupPosition {
    left?: string;
    top?: string;
    bottom?: string;
    right?: string;
  }
}
