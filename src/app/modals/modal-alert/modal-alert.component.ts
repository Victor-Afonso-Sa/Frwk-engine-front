import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  @Input() type;
  @Input() msg;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    setTimeout(() => {
      this.onCloseModal();
    }, 2000);
  }

  onCloseModal() {
    this.modalService.hide();
  }
}
