import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://test-marketplace-api.herokuapp.com/api/';

  constructor(
    public http : HttpClient
  ) { }

 endpoints: {[endpoints: string]: string | any} = {
   carList: `${this.baseUrl}car/list`,
   addCar: `${this.baseUrl}car/add-car`,
   carDetails: (slug: string) => `${this.baseUrl}car/${slug}`,
   editCar: (slug:string) => `${this.baseUrl}car/edit/${slug}`,
   imageUpload: `${this.baseUrl}car/img-upload`,
   login: `${this.baseUrl}user/signin`,
 };

 getCarList(): Observable<any> {
   return this.http.get(this.endpoints.carList);
 }

 request(url: endpointType, method: string, payload?: object, urlParams?: any) {

  // this.http.get(this.endpoints.carList);
  // this.http['get'](this.endpoints['carList']);

  const finalUrl = (!urlParams)
   ? this.endpoints[url] : this.endpoints[url](urlParams);
   
  return (!payload) ? 
  this.http.request(method, finalUrl) : this.http.request(method, finalUrl, {body: payload});

 }

}

export type endpointType = 'carList' | 'addCar' | 'carDetails' | 'editCar' | 'imageUpload' | 'login';
