import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChatService } from 'src/app/services/chat.service';
import { scan , filter, map} from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {

  currentTheme="blue";
  popup_modal: boolean = false;
  open_modal: boolean = false;
  modalRef: BsModalRef = new BsModalRef;
  message?: string;
  messages: any[] = [];
  username: string = "Taroon";
  color: string = "warning";
  bgColor: string = "dark";
  list$ = this.chatService.messages.pipe(
    filter(val => {
      console.log('Val in filter: ', val);
      const blackList = ['breakfast', 'early', 'lol'];
      let final = true;
      blackList.forEach( word => {
        if(val.message.includes(word)) final = false;
      });
      return final;
    }),
    map(val => {
      const subs: any = {
        'homework': 'lunch'
      };
      let message = val.message;
      val.message = subs[message] ? subs[message] : message;
      return val;
    }),
    scan((acc: any[], value) => {
      acc.push(value);
      return acc;
    }, [])
  );

  constructor(
    private modalService: BsModalService,
    public chatService: ChatService,
    public settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.getMessages();

    if (this.settingService.theme) {
      this.currentTheme = this.settingService.theme;
    }


    this.settingService.outsetTheme.subscribe(newTheme => {
      console.log('New theme: ', newTheme);

      this.currentTheme = newTheme;
    })
  }

  openModal(Template: TemplateRef <any> ) {
    this.modalRef = this.modalService.show(Template);
    this.open_modal = true;
    console.log('open modal: ', this.open_modal);
  }

  sendMessage() {
    const messageObject = { 
        'message': this.message, 
        'username': this.username, 
        'color': this.color, 
        'bgColor': this.bgColor 
    };
    this.chatService.sendMessage(messageObject);
    this.message = "";
  }

  getMessages() {
    this.chatService.messages.pipe(
      filter(val => {
        console.log('Val in filter: ', val);
        const blackList = ['breakfast', 'early', 'lol'];
        let final = true;
        blackList.forEach( word => {
          if(val.message.includes(word)) final = false;
        });
        return final;
      }),
      map(val => {
        const subs: any = {
          'lunch': 'homework'
        };
        let message = val.message;
        val.message = subs[message] ? subs[message] : message;
        return val;
      }),
      scan((acc: any[], value) => {
        acc.push(value); 
        return acc;
      }, [])
    ).subscribe((message: any[]) => {
      console.log("Receive Message: ", message)
      this.messages = (message);
      this.open_modal = !this.open_modal;
      console.log('open modal: ', this.open_modal);
      this.popup_modal = true;
    });
  }

}

