import { EventEmitter, Injectable, Output } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../shared.service';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalCreatePastasComponent } from './modal-create-pastas/modal-create-pastas.component';
import { ModalNewVarComponent } from './modal-new-var/modal-new-var.component';
import { ModalRegraOptionComponent } from './modal-regra-option/modal-regra-option.component';
import { ModalRegrasComponent } from './modal-regras/modal-regras.component';
import { ModalVariaveisComponent } from './modal-variaveis/modal-variaveis.component';
import { ModalExpressaoComponent } from './modalExpressao/modalExpressao.component';
import { TestRegraComponent } from './test-regra/test-regra.component';
@Injectable({
  providedIn: 'root',
})
export class ModalsServicesService {
  bsModalRef: BsModalRef;
  @Output() escolha = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private shared: SharedService
  ) {}

  createPasta(pastas: Array<any>, mode: string, pasta?: object, nome?: string) {
    this.bsModalRef = this.modalService.show(ModalCreatePastasComponent, {
      class: 'modal-dialog-centered',
      id: 1,
    });
    this.bsModalRef.content.pastas = pastas;
    this.bsModalRef.content.pasta = pasta;
    this.bsModalRef.content.mode = mode;
    if (nome) {
      this.bsModalRef.content.editar = true;
      this.bsModalRef.content.nome = nome;
    }
  }
  createConfirm(
    msg?: string,
    title?: string,
    confirm?: string,
    decline?: string
  ) {
    this.bsModalRef = this.modalService.show(ModalConfirmComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      id: 1,
    });
    if (msg) {
      this.bsModalRef.content.msg = msg;
    }
    if (title) {
      this.bsModalRef.content.title = title;
    }
    if (confirm) {
      this.bsModalRef.content.confirm = confirm;
    }
    if (decline) {
      this.bsModalRef.content.decline = decline;
    }
    return this.bsModalRef.content as ModalConfirmComponent;
  }
  createAlert(type: string, msg: string) {
    this.bsModalRef = this.modalService.show(ModalAlertComponent, {
      class: 'modal-dialog-centered second',
      ignoreBackdropClick: false,
      id: 2,
    });
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.msg = msg;
  }
  createOption(onde, objeto) {
    this.bsModalRef = this.modalService.show(ModalRegraOptionComponent, {
      class: 'modal-dialog-centered modal-sm',
      ignoreBackdropClick: false,
      keyboard: false,
      id: 1,
    });
    this.bsModalRef.content.onde = onde;
    this.bsModalRef.content.objeto = objeto;
  }
  createVar(objetoCompleto, objeto?: object, varControler?:any) {
    this.bsModalRef = this.modalService.show(ModalNewVarComponent, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      keyboard: false,
      id: 1,
    });
    if(varControler){
      this.bsModalRef.content.varControler = varControler;
    }
    const variaveisCopy = Object.assign([], objetoCompleto[`variaveis`]);
    if (objetoCompleto[`variaveisfixas`]) {
      variaveisCopy.push(
        objetoCompleto[`variaveisfixas`].entrada,
        objetoCompleto[`variaveisfixas`].saida
      );
    }
    this.bsModalRef.content.schema = objetoCompleto;
    if (objeto) {
      this.bsModalRef.content.objeto = objeto;
      this.bsModalRef.content.edit = Object.assign({}, objeto);
      variaveisCopy.splice(variaveisCopy.indexOf(objeto), 1);
    }
    this.createVarForTree(variaveisCopy).then(
      (value) => (this.bsModalRef.content.variaveis = value)
    );
    if (objetoCompleto[`variaveisLocal`]) {
      if (objetoCompleto[`variaveisLocal`].indexOf(objeto) >= 0) {
        this.bsModalRef.content.indexLocal = objetoCompleto[
          `variaveisLocal`
        ].indexOf(objeto);
      }
    } else if (objetoCompleto[`variaveis`]) {
      if (objetoCompleto[`variaveis`].indexOf(objeto) >= 0) {
        this.bsModalRef.content.indexLocal = objetoCompleto[
          `variaveis`
        ].indexOf(objeto);
      }
    }
  }
  modalVariaveis(variaveis, only?: string) {
    this.bsModalRef = this.modalService.show(ModalVariaveisComponent, {
      class: 'modal-sm',
      ignoreBackdropClick: false,
      keyboard: false,
      id: 1,
    });
    let variaveisCopy = Object.assign([], variaveis);
    if (only) {
      this.bsModalRef.content.only = only;
    }
    this.createVarForTree(variaveisCopy).then(
      (value) => (this.bsModalRef.content.variaveis = value)
    );
  }
  modalExpressao(variaveis, objeto?: object, onde?: any, key?: string) {
    this.bsModalRef = this.modalService.show(ModalExpressaoComponent, {
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      keyboard: false,
      id: 1,
    });
    if (onde) {
      this.bsModalRef.content.onde = onde;
    }
    if (objeto) {
      this.bsModalRef.content.objeto = objeto;
    }
    if (key) {
      this.bsModalRef.content.key = key;
    }
    this.createVarForTree(variaveis).then(
      (value) => (this.bsModalRef.content.variaveis = value)
    );
  }
  createTest(idregra, entradaVar) {
    this.bsModalRef = this.modalService.show(TestRegraComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: false,
      keyboard: false,
      id: 1,
    });
    this.bsModalRef.content.idregra = idregra;
    this.bsModalRef.content.entradaVar = entradaVar;
  }
  createModalRegras(onde,regra) {
    this.bsModalRef = this.modalService.show(ModalRegrasComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: false,
      keyboard: false,
      id: 1,
    });
    this.bsModalRef.content.onde = Object.assign(onde);
    this.bsModalRef.content.regraId = regra;
  }
  private async createVarForTree(variaveis: Array<any>) {
    let auxArray = [];
    let obj = { modelo: null, valor: {} };
    for (const item of variaveis) {
      const prop = {
        id: item.nome,
        type: item.type,
        valor: JSON.stringify(item.valor),
      };
      if (item.type == `array`) {
        prop[`tipoitems`] = item.tipoitems;
        prop[`tipomodelo`] = item.tipomodelo;
        prop[`modelo`] = item.modelo;
      }
      if (item.type == `modelo`) {
        prop[`type`] = item.tipomodelo;
        prop[`modelo`] = item.modelo;
      }
      if (item.modelo && item.type != `array`) {
        if (typeof item.modelo == 'object') {
          obj.modelo = item.modelo;
        } else {
          obj.modelo = JSON.parse(item.modelo);
        }
        if (item.valor) {
          obj.valor =
            typeof item.valor == `object` ? item.valor : JSON.parse(item.valor);
        }
        if (obj.modelo.properties) {
          let keys = Object.keys(obj.modelo.properties);
          let child = [];
          for (let index = 0; index < keys.length; index++) {
            let objAux = {
              id: `${item.nome}.${keys[index]}`,
              nome: `${item.nome}.${keys[index]} : ${
                obj.modelo.properties[keys[index]].type
              }`,
              type: obj.modelo.properties[keys[index]].type,
            };
            if (obj.valor) {
              objAux[`valor`] = obj.valor[keys[index]];
            } else {
              objAux[`valor`] = null;
            }
            if (
              obj.modelo.properties[keys[index]].type.split(`.`).length >= 2
            ) {
              let response = await this.buscarModelo(
                obj.modelo.properties[keys[index]].type
              );
              let k = Object.keys(response);
              let aux = [];
              for (let iter = 0; iter < k.length; iter++) {
                let type = response[k[iter]].type;
                const nomeVar = `${item.nome}.${keys[index]}.${k[iter]}`;
                let value = null;
                if (
                  obj.valor &&
                  obj.valor[keys[index]] &&
                  obj.valor[keys[index]][k[iter]]
                ) {
                  value = obj.valor[keys[index]][k[iter]];
                }
                const c = {
                  id: nomeVar,
                  nome: `${nomeVar} : ${type}`,
                  valor: value,
                };
                aux.push(c);
              }
              objAux[`children`] = aux;
            }
            child.push(objAux);
            prop[`children`] = child;
          }
        }
      }
      (prop[`nome`] = `${prop.id} : ${prop.type}`), auxArray.push(prop);
    }
    return auxArray;
  }
  private async buscarModelo(path) {
    let aux;
    path = path.split(`.`);
    await this.shared.getModelos(path[0], path[1]).then((response) => {
      aux = response.properties;
    });
    return aux;
  }
}
