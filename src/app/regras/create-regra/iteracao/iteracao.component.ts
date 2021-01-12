import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  take,
} from 'rxjs/operators';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'app-iteracao',
  templateUrl: './iteracao.component.html',
  styleUrls: ['../styleEscopo.css', './iteracao.component.scss'],
})
export class IteracaoComponent extends EscopoClassComponent {
  como = new FormControl(
    this.objetoLocal['acao'] && this.objetoLocal['acao'].iterado
      ? this.objetoLocal['acao'].iterado
      : `item`
  );
  array;
  iterado;
  indice;
  ngOnInit() {
    super.ngOnInit();
    this.como.valueChanges
      .pipe(
        map((val) => val.trim()),
        filter((value) => value && value.length >= 1 && value != ' '),
        distinctUntilChanged(),
        debounceTime(200)
      )
      .subscribe((value) => {
        if (this.iterado) {
          this.verificarNome();
          this.iterado[`nome`] = value;
          this.objetoLocal['acao'].iterado = value;
          this.service.editarVariaveisEscopo(
            this.objetoLocal,
            this.iterado,
            this.iterado
          );
        }
      });
  }
  openVariaveis() {
    const array = this.setArrayIter();
    super.openVariaveis('array', array);
    let varivel$ = this.variavelService.variavel
      .pipe(
        filter((v) => v && v !== this.array && v.type == `array`),
        first(),
        distinctUntilChanged(),
        take(1)
      )
      .subscribe((v) => {
        this.array = v;
        this.objetoLocal['acao'].array = this.array;
        this.objetoLocal['acao'].indice = 'indice_' + this.array.id;
        this.objetoLocal['acao'].iterado = this.como.value;
        this.createVar();
      });
  }
  createVar() {
    if (!this.indice) {
      this.indice = {
        nome: this.objetoLocal['acao'].indice,
        type: `integer`,
        valor: 0,
        iterado: true,
      };
    }
    if (!this.iterado) {
      this.iterado = {
        nome: `item`,
        type: this.array.tipoitems,
        iterado: true,
      };
      if (this.array.tipoitems == `modelo`) {
        this.iterado.type = this.array.tipomodelo;
        this.iterado.modelo = this.array.modelo;
      }
      if (
        this.como.value &&
        this.como.value.length >= 1 &&
        this.como.value != ' '
      ) {
        this.iterado.nome = this.como.value;
      }
      this.service.setVariaveisEscopo(this.objetoLocal, this.iterado, true);
      this.objetoLocal[`variaveis`].push(this.iterado);
      this.service.setVariaveisEscopo(this.objetoLocal, this.indice, true);
      this.objetoLocal[`variaveis`].push(this.indice);
    } else {
      const auxVar = {
        nome: Object.assign(this.como.value),
        type: this.array.tipoitems,
      };
      const auxIndice = {
        nome: this.objetoLocal['acao'].indice,
        type: `integer`,
        valor: 0,
      };
      this.service.editarVariaveisEscopo(
        this.objetoLocal,
        auxVar,
        this.iterado
      );
      this.service.editarVariaveisEscopo(
        this.objetoLocal,
        auxIndice,
        this.indice
      );
      this.indice = auxIndice;
    }
  }
  verificarNome() {
    let nome: string = this.como.value;
    let valor = this.objetoLocal[`variaveis`].find(
      (exist) => exist.nome == nome
    );
    if (valor) {
      this.como.setErrors({ exist: true });
    }
  }
  setArrayIter() {
    const aux = [];
    for (let index = 0; index < this.objetoLocal[`variaveis`].length; index++) {
      const element = this.objetoLocal[`variaveis`][index];
      if (!element.iterado) {
        aux.push(element);
      }
    }
    return aux;
  }
}
