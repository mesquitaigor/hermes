import { IHmsStorage } from './IHmsStorage';
import HmsStorageService from './hms-storage.service'; 

describe(HmsStorageService.name, () => {
  let service: HmsStorageService;
  const originalStoragSet = localStorage.setItem;
  const originalStoragGet = localStorage.getItem;
  const originalStoragClear = localStorage.clear;
  const originalStoragRemove = localStorage.removeItem;
  let storageValue = JSON.stringify('accessToken')
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    spyOn(localStorage, 'setItem').and.callFake(() => {});

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      key 
      return storageValue
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    spyOn(localStorage, 'clear').and.callFake(() => {});
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {key});
  })
  beforeEach(() => {
    service = new HmsStorageService();
  })
  afterAll(() => {
    localStorage.setItem = originalStoragSet;
    localStorage.getItem = originalStoragGet;
    localStorage.clear = originalStoragClear;
    localStorage.removeItem = originalStoragRemove;
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  })
  it('should set a value in the storage', () => {
    service.set(IHmsStorage.keys.ACCESS_TOKEN, storageValue);
    expect(localStorage.setItem).toHaveBeenCalledWith(IHmsStorage.keys.ACCESS_TOKEN, JSON.stringify(storageValue));
  })
  it('should get a value from the storage', () => {
    service.get(IHmsStorage.keys.ACCESS_TOKEN);
    expect(localStorage.getItem).toHaveBeenCalledWith(IHmsStorage.keys.ACCESS_TOKEN);
  })
  it(`should return a ${IHmsStorage.StorageItem.name} when get is called`, () => {
    const getReturnValue = service.get(IHmsStorage.keys.ACCESS_TOKEN);
    expect(getReturnValue).toBeInstanceOf(IHmsStorage.StorageItem);
  })
  it(`should clear storage`, () => {
    service.clear()
    expect(localStorage.clear).toHaveBeenCalled();
  })
  it(`should remove item from storage`, () => {
    service.remove(IHmsStorage.keys.ACCESS_TOKEN)
    expect(localStorage.removeItem).toHaveBeenCalled();
  })
})