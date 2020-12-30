import { EventEmitter, Injectable, Output } from '@angular/core';
import { ParametrosService } from 'src/app/parametros/parametros.service';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root',
})
export class NewVarService {
  @Output() variavel = new EventEmitter();
  @Output() verificacao = new EventEmitter();
  @Output() modalClose = new EventEmitter();
  constructor(private shared: SharedService,private paramsService:ParametrosService) {}

  async verificadorEval(variavel) {
    let expressao = '';
    let aux = {
      type: variavel.type==`modelo` ? variavel.tipomodelo : variavel.type,
    };
    if (variavel.type == `array`) {
      aux[`items`] = {};
      if (variavel.tipoitems == `modelo`) {
        aux[`items`].type = variavel.tipomodelo;
      } else {
        aux[`items`].type = variavel.tipoitems;
      }
    }
    const valid = await this.shared.jsonGenerate(aux);
    if (variavel) {
      if (variavel.type == 'integer') {
        expressao += `var ${
          variavel.id ? variavel.id : variavel.nome
        } = parseInt(${valid}) ;`;
      } else if (variavel.type == 'string') {
        expressao += `var ${
          variavel.id ? variavel.id : variavel.nome
        } = String("${valid}") ;`;
      } else if (variavel.type == 'boolean') {
        expressao += `var ${
          variavel.id ? variavel.id : variavel.nome
        } = ${valid} ;`;
      } else {
        const obj = JSON.stringify(valid);
        expressao += `var ${
          variavel.id ? variavel.id : variavel.nome
        } = ${obj} ;`;
      }
    }
    return expressao;
  }
  verificadorType(variavel, value) {
    let expressao = ``;
    if (variavel[`type`] == `integer`) {
      expressao += `var IntERNALvar = parseInt(${value})`;
    } else {
      expressao += `var IntERNALvar = ${value} `;
    }
    return expressao;
  }
  async iniciarParametros(){
  let expressao = '';
  const paramentros = this.paramsService.parametros;
  for (let index = 0; index < paramentros.length; index++) {
    const parms = paramentros[index];
    expressao += await this.verificadorEval(parms);
  }
  return expressao;
  }
}
