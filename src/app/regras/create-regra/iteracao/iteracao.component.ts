import { Component, OnInit } from '@angular/core';
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
  como = new FormControl(this.objetoLocal['acao'] && this.objetoLocal['acao'].iterado ? this.objetoLocal['acao'].iterado : `item`);
  array;
  iterado;
  ngOnInit() {
    super.ngOnInit();
    this.como.valueChanges
      .pipe(
        map(val => val.trim()),
        filter((value) => value && value.length >= 1 && value != " "),
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
    super.openVariaveis('array');
    this.variavelService.variavel.pipe(first(), take(1)).subscribe((v) => {
      if (v && v !== this.array) {
        if (v.type == `array`) {
          this.array = v;
        this.objetoLocal['acao'].array = this.array;
        this.objetoLocal['acao'].iterado = this.como.value;
        this.createVar();
        }
      }
    });
  }
  createVar() {
    if (!this.iterado) {
      this.iterado = {
        nome: `item`,
        type: this.array.tipoitems,
        itemArray: true,
      };
      if(this.array.tipoitems == `modelo`){
        this.iterado.type = this.array.tipomodelo;
        this.iterado.modelo = this.array.modelo;
      }
      if( this.como.value && this.como.value.length >= 1 && this.como.value != " "){
        this.iterado.nome = this.como.value;
      }
      this.service.setVariaveisEscopo(this.objetoLocal, this.iterado, true);
      this.objetoLocal[`variaveis`].push(this.iterado);
    } else {
      const aux = {
        nome: Object.assign(this.como.value),
        type: this.array.tipoitems,
      };
      this.service.editarVariaveisEscopo(
        this.objetoLocal,
        aux,
        this.iterado
      );
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
}
