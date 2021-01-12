import { Component } from '@angular/core';
import { distinctUntilChanged, filter, first, take } from 'rxjs/operators';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'app-executar-regra',
  templateUrl: './executar-regra.component.html',
  styleUrls: ['../styleEscopo.css', './executar-regra.component.scss'],
})
export class ExecutarRegraComponent extends EscopoClassComponent {
  regra;
  variavel;
  openExpressao() {
    const obj = {
      type: this.objetoLocal['acao'].regra.entrada.type,
      valor: this.objetoLocal['acao'].entrada,
    };
    this.modals.modalExpressao(
      this.objetoLocal[`variaveis`],
      obj,
      this.objetoLocal['acao'],
      `entrada`
    );
  }
  openRegras() {
    this.objetoLocal['acao'].regra = '';
    this.modals.createModalRegras(this.objetoLocal['acao'], this.service.objetoRegra);
  }
  openVariaveis() {
    super.openVariaveis(
      this.objetoLocal['acao'].regra.saida.type == `modelo`
        ? this.objetoLocal['acao'].regra.saida.tipomodelo
        : this.objetoLocal['acao'].regra.saida.type
    );
    this.variavelService.variavel
      .pipe(
        first(),
        distinctUntilChanged(),
        take(1),
        filter((v) => v && v != {})
      )
      .subscribe((vari) => {
        this.variavel = vari;
        this.objetoLocal['acao'].retorno = vari.id;
      });
  }
}
