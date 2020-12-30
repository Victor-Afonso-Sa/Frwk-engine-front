import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { ParametrosService } from '../parametros.service';

@Component({
  selector: 'app-parametros-form',
  templateUrl: './parametros-form.component.html',
  styleUrls: ['./parametros-form.component.css'],
})
export class ParametrosFormComponent implements OnInit {
  edit = false;
  clicou = false;
  objeto: object = { nome: null };
  pastasModelos;
  pastaId;
  pasta;
  idParams;
  index;
  jsonError;
  paramCopy;
  constructor(
    private shared: SharedService,
    private activated: ActivatedRoute,
    private paramsService: ParametrosService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activated.params.forEach((params) => {
      if (params[`pasta`]) {
        this.pastaId = params[`pasta`];
      }
      if (params[`edit`]) {
        this.edit = true;
        this.idParams = params[`edit`];
      }
      this.getParams();
    });
    this.shared.getPastas().subscribe((data: Array<any>) => {
      if (data) {
        data.forEach((pasta) => {
          let json = JSON.parse(pasta['schemapastas']);
          pasta['schemapastas'] = json;
        });
        this.pastasModelos = data;
      }
    });
  }
  getJsonError(event) {
    this.jsonError = event;
  }
  getParams() {
    this.paramsService
      .getParametrosById(this.pastaId)
      .pipe(
        filter((p) => p && p != null),
        map((p) => {
          p[0][`parametros`] = JSON.parse(p[0][`parametros`]);
          return p[0];
        })
      )
      .subscribe((pastaParam) => {
        this.pasta = pastaParam;
        if (this.edit) {
          this.setEdit();
        }
      });
  }
  excluir() {
    this.pasta.parametros.splice(this.index, 1);
    this.pasta.parametros = JSON.stringify(this.pasta.parametros);
    this.paramsService.putParametros(this.pasta).subscribe(
      () => {},
      () => {},
      () => {
        this.paramsService.atualizar.emit(true);
        this.route.navigate([
          {
            outlets: {
              primary: [`parametros`],
              dash: null,
            },
          },
        ]);
      }
    );
  }
  salvar(form) {
    this.objeto[`nome`] = form.value.nome;
    if (!this.edit) {
      this.objeto[`id`] = `${this.pastaId}_${this.objeto[`nome`]
        .trim()
        .replace(/ /g, '_')
        .toLowerCase()}`;
      this.pasta.parametros.push(this.objeto);
    }
    this.pasta.parametros = JSON.stringify(this.pasta.parametros);
    this.paramsService.putParametros(this.pasta).subscribe(
      () => {},
      () => {},
      () => {
        this.paramsService.atualizar.emit(true);
        this.route.navigate([
          {
            outlets: {
              primary: [`parametros`],
              dash: null,
            },
          },
        ]);
      }
    );
  }
  setEdit() {
    this.index = this.pasta.parametros.findIndex(
      (param) => param.id == this.idParams
    );
    this.objeto = this.pasta.parametros[this.index];
    this.paramCopy = Object.assign({}, this.objeto);
  }
  resetModelo(obj) {
    delete obj[`valor`];
    if (obj.type != 'modelo') {
      delete obj[`modelo`];
      delete obj[`tipomodelo`];
    }
    if (obj.type != 'array') {
      delete obj[`tipoitems`];
    }
  }
  async setArray(v) {
    this.resetModelo(this.objeto);
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
  async setModelo(tipo) {
    this.objeto[`modelo`] = await this.getModelo(tipo);
    const valor = await this.shared.jsonGenerate(this.objeto[`modelo`]);
    if (this.objeto[`tipoitems`]) {
      this.objeto[`valor`] = [valor];
    } else {
      this.objeto[`valor`] = valor;
    }
    this.objeto[`valor`] = JSON.stringify(this.objeto[`valor`]);
  }
  async getModelo(tipomodelo) {
    let path = tipomodelo;
    path = path.split(`.`);
    return await this.shared.getModelos(path[0], path[1]);
  }
  verificarNome(nome, form) {
    if (nome.length > 0) {
      const id = nome.trim().replace(/ /g, '.').toLowerCase();
      if (
        this.pasta.parametros.find(
          (param) =>
            (param.id == id && id != this.objeto[`id`]) ||
            (param.nome == nome && nome != this.objeto[`nome`])
        )
      ) {
        form.controls.nome.setErrors({ exist: true });
        return true;
      }
    }
  }
}
