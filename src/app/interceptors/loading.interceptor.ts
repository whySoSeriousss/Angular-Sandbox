import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  activeRequest: number = 0;

  constructor(
    public loadingService : LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('from loading interceptors');
    if(this.activeRequest === 0) {
      console.log('active request is 0');
      this.loadingService.startLoading();
    }

    this.activeRequest++;
    console.log('active request is:' , this.activeRequest);

    return next.handle(request).pipe(
    finalize(() => {
      if (this.activeRequest > 0) {
        this.activeRequest--;
      }

      if (this.activeRequest === 0) {
        this.loadingService.stopLoading();
      }
    })
    );
  }
}
