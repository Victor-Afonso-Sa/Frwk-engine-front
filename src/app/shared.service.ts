import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dateFormat from 'dateformat';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  valorAux;
  excluirModelo = new Subject<any>();
  editarPath = {};
  modelEditar = {};
  refresh = false;
  pastaModelos;
  readonly URI = environment.BANCO;
  constructor(private http: HttpClient) {}

  getPastas() {
    return this.http.get(this.URI + '/modelo').pipe(take(1));
  }
  executeTest(id, entrada) {
    return this.http.post(`${this.URI}/run/${id}`, entrada);
  }
  criarPastas(schema, onde) {
    return this.http
      .post(this.URI + '/modelo', schema)
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          value[`schemapastas`] = JSON.parse(value[`schemapastas`]);
          onde.push(value);
        }
      });
  }
  atualizarPasta(pasta) {
    return this.http.put(this.URI + '/modelo', pasta).pipe(take(1));
  }
  deletePasta(pasta) {
    return this.http
      .delete(this.URI + '/modelo', { params: { id: pasta.idpasta } })
      .pipe(take(1));
  }
  setEditar(pasta, modelEditar) {
    this.setPastaPath(pasta);
    this.modelEditar = modelEditar;
  }
  setPastaPath(pasta) {
    this.editarPath = pasta;
  }
  getEditarModel() {
    return this.modelEditar;
  }
  getEditarModelo() {
    return this.editarPath;
  }
  setExcluirModelo(model) {
    this.excluirModelo.next(model);
  }
  setValue(v) {
    this.valorAux = v;
  }
  async jsonGenerate(schema) {
    let json = {};
    var value;
    // console.log(schema);
    if (schema.type == 'string') {
      var now = new Date();
      if (schema.format && schema.format == 'date') {
        if (schema.customPattern) {
          value = dateFormat(now, schema.customPattern);
        } else {
          value = dateFormat(now, 'yyyy-mm-dd');
        }
      }
      if (schema.format && schema.format == 'date-time') {
        if (schema.customPattern) {
          value = dateFormat(now, schema.customPattern);
        } else {
          value = dateFormat(now);
        }
      } else {
        value = 'exemplo';
      }
    } else if (schema.type == 'integer') {
      value = 1;
    } else if (schema.type == 'boolean') {
      value = false;
    } else if (schema.type == 'object') {
      let keys = Object.keys(schema.properties);
      for (let i = 0; i < keys.length; i++) {
        json[keys[i]] = await this.jsonGenerate(schema.properties[keys[i]]);
      }
      value = json;
    } else if (schema.type == 'array') {
      const array = [];
      array.push(await this.jsonGenerate(schema[`items`]));
      value = array;
    } else {
      if (schema.type) {
        const aux = await this.buscarModelo(schema.type);
        value = aux;
      }
    }
    return value;
  }
  async buscarModelo(path) {
    path = path.replace(/\./, '&').split('&');
    let obj;
    obj = await this.getModelos(path[0], path[1]);
    return this.jsonGenerate(obj);
  }
  getPastaById(idPasta) {
    return this.http.get(`${this.URI}/modelo/${idPasta}`);
  }
  async getModelos(pastaId, modelId) {
    let aux;
    await this.getPastas()
      .toPromise()
      .then((reponse: Array<any>) => {
        if (reponse) {
          reponse.forEach((pasta) => {
            pasta.schemapastas = JSON.parse(pasta[`schemapastas`]);
            if (pasta.idpasta == pastaId) {
              pasta.schemapastas.models.forEach((modelo) => {
                if (modelo.idModel == modelId) {
                  aux = JSON.parse(modelo[`jsonModel`]);
                }
              });
            }
          });
        }
      });
    return aux;
  }
  isValidJSON(string) {
    try {
      JSON.parse(string);
      return [true, `Json valido`];
    } catch (e) {
      return [false, e];
    }
  }
  getPastaRegras() {
    return this.http.get(this.URI + '/pastaregras');
  }
  postPastaRegras(value) {
    return this.http.post(this.URI + '/pastaregras', value);
  }
  putPastaRegras(value) {
    return this.http.put(this.URI + '/pastaregras', value);
  }
  getOnePastaRegras(id) {
    return this.http.get(this.URI + '/pastaregras/' + id);
  }
  deletePastaRegras(id) {
    return this.http.delete(this.URI + '/pastaregras', { params: { id: id } });
  }
  setClasse(id, className = `item`, select = `selected`) {
    this.retirarSelected(className, select);
    const active = document.getElementById(id);
    if (active) {
      active.className = select;
    }
  }
  retirarSelected(className, select) {
    const items = document.getElementsByClassName(className);
    for (let index = 0; index < items.length; index++) {
      const atual = document.getElementsByClassName(select);
      if (atual.length > 0) {
        for (let index = 0; index < atual.length; index++) {
          const element = atual[index];
          element.className = element.className.replace(select, className);
        }
      }
    }
  }
  setPastas() {
    this.getPastas().subscribe((data: Array<any>) => {
      if (data) {
        data.forEach((pasta) => {
          let json = JSON.parse(pasta['schemapastas']);
          pasta['schemapastas'] = json;
        });
        this.pastaModelos = data;
      }
    });
    return this.pastaModelos;
  }
}
