import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList: User[] = [];

  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.request('userList', 'get').subscribe((result: {[key: string]: string | any}) => {
      console.log('Get users results:', result);
      if (result){
        this.userList = result['data'];
      }
    })
  }

}
