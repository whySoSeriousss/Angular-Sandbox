import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _currentTheme = '';
  public outsetTheme: Subject<any> = new Subject();

  constructor(
    public storageService: StorageService
  ) { }

  get theme() {
    this._currentTheme = this.storageService.get('theme');
    return this._currentTheme;
  }

  set theme(value) {
    this._currentTheme = value;
    this.outsetTheme.next(value);
    this.storageService.set('theme', value);

    console.log('setting them to: ', value);
  }
}
