import { Injectable } from '@angular/core';
import { IHmsStorage } from './IHmsStorage';

@Injectable({
  providedIn: 'root'
})
export default class HmsStorageService{

  /**
  * @description This method allows you to store a value in the storage, associating it with the provided key.
  * @param {storageKey} key The storage item key name. Use {@link IHmsStorage.keys} to access the enum.
  * @param {IHmsStorage.storage[storageKey]} value The storage item value. Use {@link IHmsStorage.storage} to access the interface.
  * @returns {Observable<IHmsStorage.storage[storageKey]>} An Observable representing the stored value.
  * Emits the stored value upon successful storage.
  */
  set<storageKey extends keyof IHmsStorage.storage>(key: storageKey, value: IHmsStorage.storage[storageKey]): void{
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
  * @description 
  * This method retrieves a value from the storage based on the specified key.
  * Utilize {@link IHmsStorage.keys} to access the enum defining possible key names, and
  * {@link IHmsStorage.storage} to understand the expected data types for values.
  *
  * @param {T} key - The storage item key name.
  * @returns {Observable<IHmsStorage.StorageItem<T> | null>} An Observable representing the retrieved value.
  * Returns null if no value is found for the provided key.
  */
  get<T extends keyof IHmsStorage.storage>(key: T): IHmsStorage.StorageItem<T> | void{
    const itemValue = JSON.parse(localStorage.getItem(key) || 'null');
    return new IHmsStorage.StorageItem<T>(
      key,
      itemValue as IHmsStorage.storage[T]
    );
  }

  /**
   * @description 
   * This method removes all items from the storage.
   *
   * @returns {Observable<void>} An Observable representing the success of the clear operation.
   * Emits void upon successful clearing of the storage.
  */
  clear(): void {
    localStorage.clear();
  }


  /**
   * @description 
   * This method removes the item associated with the specified key from the storage.
   * Utilize {@link IHmsStorage.keys} to access the enum defining possible key names.
   *
   * @param {T} key - The storage item key name.
   * @returns {Observable<void>} An Observable representing the success of the removal operation.
   * Emits void upon successful removal of the item.
  */
  remove<T extends keyof IHmsStorage.storage>(key: T): void {
    localStorage.removeItem(key);
  }

}