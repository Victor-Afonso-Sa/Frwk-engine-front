import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, take } from 'rxjs/operators';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'app-enquanto',
  templateUrl: './enquanto.component.html',
  styleUrls: ['../styleEscopo.css', './enquanto.component.scss']
})
export class EnquantoComponent extends EscopoClassComponent {
  aux;

  openModalExpressao() {
    const obj = {
      condicoes: true,
      type: 'boolean',
      valorinicial: this.aux,
    };
    this.modals.modalExpressao(this.objetoLocal[`variaveis`], obj);
    this.expressaoService.expressao
      .pipe(first(), distinctUntilChanged(), debounceTime(300), take(1))
      .subscribe((value) => {
        if (value) {
          this.aux = value;
          this.objetoLocal[`acao`].expressao = value;
        }
      });
  }
}
