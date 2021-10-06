import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Starships } from 'src/app/models/starships';

@Component({
  selector: 'app-star-modal',
  templateUrl: './star-modal.component.html',
  styleUrls: ['./star-modal.component.scss']
})
export class StarModalComponent implements OnInit {

  modalRef: BsModalRef = new BsModalRef();
  @Input() starshipDetails?: Starships;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal(Template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Template);
  }

}
