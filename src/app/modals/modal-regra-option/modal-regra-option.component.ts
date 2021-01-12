import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegrasService } from 'src/app/regras/regras.service';

@Component({
  selector: 'app-modal-regra-option',
  templateUrl: './modal-regra-option.component.html',
  styleUrls: ['./modal-regra-option.component.scss'],
})
export class ModalRegraOptionComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private service: RegrasService
  ) {}
  objeto;
  onde;
  clicou = false;
  ngOnInit() {}
  hide() {
    this.modalService.hide();
  }
  escolhido(value) {
    this.service.showEscopo(value, this.onde, this.objeto);
    this.hide();
  }
}
