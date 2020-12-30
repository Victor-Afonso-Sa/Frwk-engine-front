import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  take,
} from 'rxjs/operators';
import { EscopoClassComponent } from '../EscopoClass.component';
import { IfComponent } from './if/if.component';

@Component({
  selector: 'app-condicao',
  templateUrl: './condicao.component.html',
  styleUrls: ['../styleEscopo.css', './condicao.component.scss'],
})
export class CondicaoComponent extends EscopoClassComponent implements AfterViewInit {
  @Input() variaveis;
  variavel = {type: `boolean`};
  aux;

  openModalExpressao() {
    const obj = {
      condicoes: true,
      type: 'boolean',
      valor: this.objetoLocal[`acao`] && this.objetoLocal[`acao`].expressao ? this.objetoLocal[`acao`].expressao : ``,
    };
    this.modals.modalExpressao(this.objeto[`variaveisescopo`], obj, this.objetoLocal[`acao`]);
  }
  title() {
    if (this.tipo == `se`) {
      return `Se `;
    } else if (this.tipo == `senaose`) {
      return `Se não se `;
    } else {
      return `Se não `;
    }
  }
  confirmDelete(number){
    super.confirmDelete(number);
    if(this.tipo == `senao`){
    this.service.buttonHide.emit(number);
    }
  }
}
