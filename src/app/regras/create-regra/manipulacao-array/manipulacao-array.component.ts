import { Component } from '@angular/core';
import { distinctUntilChanged, first, take } from 'rxjs/operators';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'app-manipulacao-array',
  templateUrl: './manipulacao-array.component.html',
  styleUrls: ['../styleEscopo.css', './manipulacao-array.component.scss'],
})
export class ManipulacaoArrayComponent extends EscopoClassComponent {
  label = `Expressão`;
  metodos = [
    { label: `ADICIONAR`, value: `adicionar` },
    { label: `REMOVER`, value: `remover` },
  ];
  openModalExpressao() {
    if (this.objetoLocal[`acao`][`array`]) {
      const obj = {
        type: this.objetoLocal[`acao`].array.tipoitems,
        valor: this.objetoLocal[`acao`][`expressao`],
      };
      this.modals.modalExpressao(
        this.objetoLocal[`variaveis`],
        obj,
        this.objetoLocal[`acao`]
      );
      this.evaluate(
        this.objetoLocal[`acao`].array,
        this.objetoLocal[`acao`][`expressao`]
      );
    }
  }
  openVariaveis() {
    super.openVariaveis(`array`);
    this.variavelService.variavel
      .pipe(first(), distinctUntilChanged(), take(1))
      .subscribe((variavel) => {
        this.objetoLocal[`acao`].array = variavel;
        this.objetoLocal[`acao`].metodo = `adicionar`;
        this.objetoLocal[`acao`].expressao = null;
      });
  }
  setMetodo(value) {
    if (value == 'remover') {
      // this.label = `Indice`;
    } else {
      // this.label = `Expressão`
    }
    this.objetoLocal[`acao`].metodo = value;
  }
}
