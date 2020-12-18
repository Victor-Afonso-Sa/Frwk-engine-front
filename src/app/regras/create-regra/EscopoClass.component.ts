import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { distinctUntilChanged, first, last, take } from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';

import { OptionService } from 'src/app/modals/modal-regra-option/option.service';
import { ExpressaoService } from 'src/app/modals/modalExpressao/expressao.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-base-form',
  template: '<br>',
})
export class EscopoClassComponent implements OnInit {
  constructor(
    protected modals?: ModalsServicesService,
    protected variavelService?: NewVarService,
    protected expressaoService?: ExpressaoService,
    protected service?: RegrasService,
    protected confirmService?: ConfirmService,
    protected option?: OptionService
  ) {}
  edicaoNome = false;
  @Input() objEdit;
  @Input() edicao = false;
  @Input() id;
  @Input() objeto;
  @Input() tipo;
  @Input() acao = {};
  objetoLocal = {};
  str: string;
  schema = ``;

  ngOnInit() {
    setTimeout(() => {
      this.init();
      this.addOnitens(this.objetoLocal);
    });
  }
  ngAfterViewInit(): void {
    if (this.edicao) {
      this.setRegra();
    }
  }
  editNome(){
    this.edicaoNome = true;
  }
  setNome(){
    this.edicaoNome = false;
    if(this.str.length > 0){
      this.objetoLocal[`nome`] = this.str;
    }
  }
  init() {
    this.objetoLocal = {
      nome: `${this.tipo}${this.id}`,
      id: this.id,
      tipo: this.tipo,
      variaveisLocal: [],
      variaveis: this.setTotVariaveis(),
      acao: {},
      itens: [],
    };
  }
  setRegra() {
    setTimeout(() => {
      this.objetoLocal = this.objeto;
      this.objeto = this.objEdit;
      for (const aux of this.objetoLocal['itens']) {
        if (aux.tipo) {
          this.service.showEscopo(aux.tipo, this.id, aux, this.objetoLocal);
        }
      }
    });
  }
  addOnitens(value) {
    if (!this.edicao) {
      this.objeto.itens.push(value);
    }
  }
  novoEscopo() {
    this.modals.createOption(this.id, this.objetoLocal);
  }
  removeRegra(number) {
    this.modals.createConfirm(
      'Todos os escopos associados serão deletados junto',
      'Certeza??',
      'Deletar',
      'Sair'
    );
    this.confirmService.responseConfirm
      .pipe(first(), take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.confirmDelete(number);
        }
      });
  }
  setTotVariaveis() {
    let retorno = [];
    if (this.objeto[`variaveis`]) {
      if (this.objeto[`variaveisfixas`]) {
        retorno = [
          ...this.objeto[`variaveis`]
        ];
      } else {
        retorno = [...this.objeto[`variaveis`]];
      }
    }
    return retorno;
  }
  openVariaveis(only?: string) {
    if(only){
      this.modals.modalVariaveis(this.objetoLocal[`variaveis`], only);
    }else{
      this.modals.modalVariaveis(this.objetoLocal[`variaveis`]);
    }
  }
  confirmDelete(number){
    if (
      this.objeto.itens &&
      this.objeto.itens.indexOf(this.objetoLocal) >= 0
    ) {
      this.objeto.itens.splice(
        this.objeto.itens.indexOf(this.objetoLocal),
        1
      );
    } else if (
      this.objeto.schemaregras.itens &&
      this.objeto.schemaregras.itens.indexOf(this.objetoLocal) >= 0
    ) {
      this.objeto.schemaregras.itens.splice(
        this.objeto.schemaregras.itens.indexOf(this.objetoLocal),
        1
      );
    }
    this.service.remove(number);
  }
  moverAcima() {
    const array = this.objeto.schemaregras[`itens`];
    const index = array.indexOf(this.objetoLocal);
    if(index >= 0){
      document.getElementById(`escopo${array[index-1][`id`]}`).before(document.getElementById(`escopo${this.id}`))
      array.splice((index-1), 0, array.splice(index, 1)[0]);
    }
  }
  moverAbaixo() {
    const array = this.objeto.schemaregras[`itens`];
    const index = array.indexOf(this.objetoLocal);
    if(index >= 0){
      document.getElementById(`escopo${array[index+1][`id`]}`).after(document.getElementById(`escopo${this.id}`))
      array.splice((index+1), 0, array.splice(index, 1)[0]);
    }
  }
}
