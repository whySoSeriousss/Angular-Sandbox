import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { PermissionService } from 'src/app/services/permission.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-card-list-template',
  templateUrl: './card-list-template.component.html',
  styleUrls: ['./card-list-template.component.scss']
})
export class CardListTemplateComponent implements OnInit {

  ref?: string;
  carList: Car[]=[];
  filterCarlist: Car[]=[];

  @Input() list: any[] = [];
  @Input() entity: string = "";

  constructor(
    public permission: PermissionService,
    public storage: StorageService,
  ) { }

  ngOnInit(): void {
    console.log('list content:', this.list);
  }

  addToFavorite(car:Car){

    this.storage.set(car.name,true);

  }

  removeFavorite(car:Car){

    this.storage.delete(car.name);
  }
}
