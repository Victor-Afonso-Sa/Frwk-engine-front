import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, first, take } from 'rxjs/operators';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';
import { ExpressaoService } from 'src/app/modals/modalExpressao/expressao.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { RegrasService } from '../../regras.service';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'app-atribuicao',
  templateUrl: './atribuicao.component.html',
  styleUrls: ['../styleEscopo.css', './atribuicao.component.css'],
})
export class AtribuicaoComponent
  extends EscopoClassComponent
  implements AfterViewInit {
  title = `Atribuição`;
  label = `Selecione a variável`;
  variavelEscolhida = null;
  valueVar = 0;
  errorControl = false ;

  openModalVariaveis() {
    this.openVariaveis();
    this.variavelService.variavel
      .pipe(first(), distinctUntilChanged(), debounceTime(300), take(1))
      .subscribe((vari) => {
        if (vari) {
          this.variavelEscolhida = vari;
          this.objetoLocal[`acao`][`variavel`] = vari;
          if (!this.objetoLocal[`acao`][`valor`]) {
            this.objetoLocal[`acao`][`valor`] = null;
          }
          this.evaluate(this.objetoLocal[`acao`][`variavel`], this.objetoLocal[`acao`][`valor`]);
        }
      });
  }
  openModalExpressao() {
    if (this.objetoLocal[`acao`][`variavel`]) {
      const obj = { type: this.objetoLocal[`acao`].variavel.type, valor: this.objetoLocal[`acao`][`valor`] };
      this.modals.modalExpressao(this.objetoLocal[`variaveis`], obj);
      this.expressaoService.expressao
        .pipe(first(), distinctUntilChanged(), debounceTime(300), take(1))
        .subscribe((value) => {
          if (value) {
            this.objetoLocal[`acao`][`valor`] = value;
            this.evaluate(this.objetoLocal[`acao`][`variavel`], this.objetoLocal[`acao`][`valor`]);
          }
        });
    }
  }
  setLabel() {
    if (this.objetoLocal[`acao`] && this.objetoLocal[`acao`][`variavel`]) {
      this.variavelEscolhida = this.objetoLocal[`acao`][`variavel`];
    } else if (!this.variavelEscolhida) {
      return this.label;
    }
    return this.variavelEscolhida.nome;
  }
  async evaluate(variavel, valor) {
    let expressao = ``;
    try {
      for(let i = 0 ; i < this.objetoLocal[`variaveis`].length;i++){
        expressao += await this.variavelService.verificadorEval(this.objetoLocal[`variaveis`][i]);
      }
      expressao += await this.variavelService.verificadorType(variavel, valor);
      eval(expressao);
      this.errorControl = false;
    } catch (error) {
      this.errorControl = true;
    }
  }
}
