import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Car } from '../../../models/car';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalRef: BsModalRef = new BsModalRef();
  @Input() carDetails?: Car;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    console.log('carDetails', this.carDetails);
  }

  openModal(Template: TemplateRef <any> ) {
    this.modalRef = this.modalService.show(Template);
  }

}
