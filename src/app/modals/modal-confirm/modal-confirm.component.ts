import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalsServicesService } from '../modals-services.service';
import { ConfirmService } from './confirm.service';
import { modalConfirm } from './confirmIt';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit,modalConfirm{
@Input() confirm = 'Sim';
@Input() decline = "Cancelar";
@Input() msg = "Deseja sair sem salvar";
@Input() title = "Ja vai sair?";
  constructor(private modalService: BsModalService,private Confirmservice: ConfirmService) { }
  pasta;
  @Output() responseConfirm = new EventEmitter();

  ngOnInit() {
  }

  onConfirm(){
    this.Confirmservice.responseConfirm.emit(true);
    this.modalService.hide();
  }
  onDecline(){
    this.Confirmservice.responseConfirm.emit(false);
    this.modalService.hide();
  }
}
