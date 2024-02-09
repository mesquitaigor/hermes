import { EventEmitter } from '@angular/core';

export type popupComponentOutputs<O> = {
  [K in keyof O]: (
    next: O[K] extends EventEmitter<infer T> ? T : never
  ) => void;
};
