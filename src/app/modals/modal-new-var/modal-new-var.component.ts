import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared.service';
import { autosize } from 'autosize';
import { NewVarService } from './new-var.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegrasService } from 'src/app/regras/regras.service';
import { distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-modal-new-var',
  templateUrl: './modal-new-var.component.html',
  styleUrls: ['./modal-new-var.component.scss'],
})
export class ModalNewVarComponent implements OnInit {
  @Input() objeto = {};
  @Input() variaveis = [];
  @Input() jsonError = true;
  @Input() edit;
  @Input() schema;
  @Input() varControler;
  @Input() pastas;
  clicou = false;
  tipoarray;
  msg;
  model;
  valid = `is-invalid`;
  constructor(
    private modalService: BsModalService,
    private shared: SharedService,
    private varService: NewVarService,
    private regrasService: RegrasService
  ) {}
  ngOnInit() {
    this.shared
      .getPastas()
      .pipe(take(1))
      .subscribe((data: Array<any>) => {
        if (data) {
          data.forEach((pasta) => {
            pasta[`schemapastas`] = JSON.parse(pasta[`schemapastas`]);
          });
          this.pastas = data;
        }
      });
    if (!this.edit) {
      this.objeto[`type`] = '';
    }
  }
  hide() {
    this.varService.modalClose.emit(`close`);
    this.objeto = this.edit;
    this.modalService.hide();
  }
  excluirVar() {
    this.regrasService.excluirVariaveisEscopo(this.schema, this.edit);
    this.modalService.hide();
  }

  save(formulario) {
    this.objeto[`nome`] = formulario.value.nome;
    this.objeto[`valor`] = this.objeto[`valor`]
      ? this.objeto[`valor`]
      : null;
    if (this.objeto[`modelo`] && this.objeto[`tipomodelo`]) {
      this.objeto[`tipomodelo`] = this.objeto[`tipomodelo`];
      this.objeto[`modelo`] = this.objeto[`modelo`];
    }
    if (this.edit) {
      this.regrasService.editarVariaveisEscopo(
        this.schema,
        this.objeto,
        this.edit
      );
      this.verificarModelos();
    } else {
      this.regrasService.setVariaveisEscopo(this.schema, this.objeto);
    }
    this.modalService.hide();
  }
  verificarModelos(){
    for (const iterator of this.schema[`variaveisLocal`]) {
      this.varControler.errors = []
      this.regrasService.verificarModelos(iterator, this.varControler);
    }
  }
  getJsonError(event) {
    this.jsonError = event;
  }
  verificarNome(f) {
    let nome: string = f.controls.nome.value;
    let valor = this.schema.variaveis.find(
      (exist) => exist.nome == nome && exist.nome != this.objeto[`nome`]
    );
    if (valor) {
      f.controls.nome.setErrors({ exist: true });
    }
  }
  tipoitems(type) {
    if (type.split(`.`).length >= 2) {
      return `modelo`;
    } else {
      return type;
    }
  }
  resetModelo() {
    delete this.objeto[`modelo`];
    delete this.objeto[`tipomodelo`];
  }
  reset(form, type) {
    form.value.valor = null;
    this.objeto[`valor`] = null;
    if (this.objeto[`tipoitems`] && type != `array`) {
      delete this.objeto[`tipoitems`];
    }
    if(this.objeto[`tipomodelo`] && type != `modelo`){
      this.resetModelo();
    }
    this.objeto[`type`] = type;
  }
  async select(tipo) {
    this.resetModelo();
    const path = tipo.split('.');
    const model = await this.shared.getModelos(path[0], path[1]);
    this.objeto[`tipomodelo`] = tipo;
    this.objeto[`modelo`] = model;
    this.shared.jsonGenerate(model).then((value) => {
      if (value) {
        if (this.objeto[`type`] == `array`) {
          const aux = [];
          aux.push(value);
          this.objeto[`valor`] = JSON.stringify(aux);
        } else {
          this.objeto[`valor`] = JSON.stringify(value);
        }
      }
    });
  }
  async setArray(v) {
    this.resetModelo();
    const aux = { type: `array`, items: {} };
    if (v != `modelo`) {
      aux.items[`type`] = v;
      await this.shared.jsonGenerate(aux).then((value) => {
        if (value) {
          this.objeto[`valor`] = JSON.stringify(value);
        }
      });
    }
  }
}
