import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExpressaoService } from './expressao.service';

@Component({
  selector: 'app-modalExpressao',
  templateUrl: './modalExpressao.component.html',
  styleUrls: ['./modalExpressao.component.scss'],
})
export class ModalExpressaoComponent implements OnInit {
  @Input() objeto = {};
  @Input() variaveis;
  @Input() onde;
  @Input() key;

  constructor(
    private bsService: BsModalService,
    private service: ExpressaoService
  ) {}
  ngOnInit() {}
  hide() {
    this.service.expressao.emit(null);
    this.bsService.hide();
  }
  save() {
    if (this.onde) {
      if (this.key) {
        this.onde[this.key] = this.objeto[`valor`];
      } else {
        this.onde.expressao = this.objeto[`valor`];
      }
    } else {
      this.service.expressao.emit(this.objeto[`valor`]);
    }
    this.bsService.hide();
  }
}
