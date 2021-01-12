import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalsServicesService } from '../modals/modals-services.service';

@Injectable({
  providedIn: 'root',
})
export class ParametrosService {
  readonly URI = environment.BANCO + '/parametros';
  @Output() atualizar = new EventEmitter();
  parametros = [];
  constructor(
    private http: HttpClient,
    private modalsSevice: ModalsServicesService
  ) {}

  getParametros() {
    return this.http.get(this.URI);
  }
  getParametrosById(idParams) {
    return this.http.get(this.URI, { params: { id: idParams } });
  }
  postParametros(param) {
    return this.http.post(this.URI, param);
  }
  putParametros(param) {
    return this.http.post(this.URI, param);
  }
  deleteParametros(idParams) {
    return this.http.delete(this.URI, { params: { id: idParams } });
  }
  setParametros(pastaParams) {
    const parametros = [];
    for (let index = 0; index < pastaParams.length; index++) {
      const element = JSON.parse(pastaParams[index][`parametros`]);
      for (let index = 0; index < element.length; index++) {
        const param = element[index];
        param.nome = param.id;
        param.valor = JSON.parse(param.valor);
        parametros.push(param);
      }
    }
    return parametros;
  }
}
