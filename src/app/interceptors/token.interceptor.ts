import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler): 
    Observable<HttpEvent<unknown>> {
      let token = this.storageService.get('token');
      if(token) {
      console.log('Interceptor token:', token);
      request = request.clone({
        setHeaders: {
          Authorization: token
        },
      })
      }
    return next.handle(request);
  }
}
