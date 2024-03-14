import { Injectable } from '@angular/core';
import HmsStorageService from '../../shared/services/storage/hms-storage.service';
import { IHmsStorage } from '../../shared/services/storage/IHmsStorage';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  constructor(
    private readonly storageService: HmsStorageService
  ){}
  getUser(): undefined | {id: number} {
    return this.storageService.get(IHmsStorage.keys.USER)?.value
  }
}
