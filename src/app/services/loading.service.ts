import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading : Subject<boolean> = new Subject();

  constructor() { }

  startLoading() {
    console.log('Start Loading');
    this.loading.next(true);
  }

  stopLoading() {
    console.log('Stop Loading');
    this.loading.next(false);
  }
}
