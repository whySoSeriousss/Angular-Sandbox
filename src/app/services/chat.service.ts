import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {Socket} from 'ngx-socket-io';
//import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages = this.socket.fromEvent<any>('new-message');

  constructor(
    private socket: Socket
  ) {
    //this.socket = io(this.url); //connection to server
   }

   sendMessage(message: any) {
    this.socket.emit('new-message', message); //channel is new-message

   }

   getMessages() {
     return new Observable((observer: Subscriber<any>) => {
       this.socket.on('new-message', (message: any) => {
          observer.next(message);
       });
     });
   }
}
