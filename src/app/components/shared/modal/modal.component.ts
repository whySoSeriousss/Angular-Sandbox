import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Car } from '../../../models/car';
import { Cake } from '../../../models/cake';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalRef: BsModalRef = new BsModalRef();
  @Input() carDetails?: Car;
  @Input() cakeDetails?: Cake;

  constructor(
    private modalService: BsModalService,
    public storage: StorageService,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    // console.log('carDetails', this.carDetails);
    // console.log('cakeDetails', this.cakeDetails);
      
    }

  openModal(Template: TemplateRef <any> ) {
    this.modalRef = this.modalService.show(Template);
  }



}
