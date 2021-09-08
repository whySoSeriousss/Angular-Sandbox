import { Component, OnInit } from '@angular/core';
import *  as env from '../../../environments/environment';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  firstName: string = 'Taroon';
  title: string = 'Title';
  url: string = env.environment.url;
  item = 'two';
  items: number[] = [1,2,3];
  array2: Array<number> = [];
  obj = {name: 'Taroon', hours: 5};
  books: Array<object> = [
    {title: 'Book 1', description: 'description 1'},
    {title: 'Book 2', description: 'description 2'},
    {title: 'Book 3', description: 'description 3'},
  ]

  //methods
  constructor() { }

  ngOnInit(): void {
    console.log('title.value', this.title);
    this.obj = {name: 'true', hours: 5};
  }


  getTitle() {

  }  
}
