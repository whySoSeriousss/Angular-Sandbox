import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://test-marketplace-api.herokuapp.com/api/';
  baseUrl1 = 'https://swapi.dev/api/';

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
   register: `${this.baseUrl}user/signup`,
   deleteCar:(id:string) => `${this.baseUrl}car/delete/${id}`,
   userList: `${this.baseUrl}user/list`,
   userDetails: (id: string) => `${this.baseUrl}user/get/${id}`,
   editUser: (id: string) => `${this.baseUrl}user/edit/${id}`,
   starshipList: `${this.baseUrl1}/starships`,
   starshipDetails: (name: string) => `${this.baseUrl1}starships/view/${name}`,
   starshipForm: (name: string) => `${this.baseUrl1}starships/add/${name}`
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

export type endpointType = 'carList' | 'addCar' | 'carDetails' | 'editCar' | 'imageUpload' | 'login' |'register' | 'deleteCar' | 'userList' | 'userDetails' | 'editUser' | 'starshipList' | 'starshipDetails' | 'starshipForm';
