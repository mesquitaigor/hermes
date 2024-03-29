import { EventEmitter } from '@angular/core';
import PopupModel from './PopupModel';

export namespace IPopupController {
  export interface PopupBehaviorNext {
    popup?: PopupModel<unknown, unknown>;
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
