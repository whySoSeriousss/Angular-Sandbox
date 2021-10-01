import { Component, Input, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-card-list-template',
  templateUrl: './card-list-template.component.html',
  styleUrls: ['./card-list-template.component.scss']
})
export class CardListTemplateComponent implements OnInit {

  @Input() list: any[] = [];
  @Input() entity: string = "";

  constructor(
    public permission: PermissionService
  ) { }

  ngOnInit(): void {
    console.log('list content:', this.list);
  }

}
