import { Injectable } from '@angular/core';
import { StorageKeys } from './StorageKeys';

@Injectable({
  providedIn: 'root',
})
export default class StorageService {
  get(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }
}
