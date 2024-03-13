export namespace IHmsStorage {
  /**
   * @description Enum for storage keys
   * @example KEY_STRING: 'key_string'
   */
  export enum keys{
    ACCESS_TOKEN = 'access_token',
  }

  /**
   * @description Interface for storage types
   * @example [IYooStorage.keys.TEST_STRING]: string
   */
  export interface storage{
    [keys.ACCESS_TOKEN]: string,
  }

  export class StorageItem<storageKey extends keyof IHmsStorage.storage>{
    constructor(
      public key: storageKey,
      public value: IHmsStorage.storage[storageKey]
    ){}
  }
}