import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  userId: string = "";

  constructor(
    public storageService: StorageService
  ) { }

  hasRole(role: string[]) {
    const userStorageObject = this.storageService.get('user');
    this.userId = userStorageObject?._id;
    // return userStorageObject?.role == role;
    return role.includes(userStorageObject?.role);
  }
}
