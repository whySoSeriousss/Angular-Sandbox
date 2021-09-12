import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cake } from '../../../models/cake';

@Component({
  selector: 'app-c-modal',
  templateUrl: './c-modal.component.html',
  styleUrls: ['./c-modal.component.scss']
})
export class CModalComponent implements OnInit {

  modalRef: BsModalRef = new BsModalRef();
  @Input() cakeDetails?: Cake;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    console.log('cakeDetails', this.cakeDetails);
  }

  openModal(Template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Template);
  }

}
