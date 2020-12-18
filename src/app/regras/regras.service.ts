import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Injector,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { AtribuicaoComponent } from './create-regra/atribuicao/atribuicao.component';
import { BreakComponent } from './create-regra/break/break.component';
import { DynamicComponentComponent } from './create-regra/dynamic-component/dynamic-component.component';
import { EnquantoComponent } from './create-regra/enquanto/enquanto.component';
import { CondicaoComponent } from './create-regra/if/condicao.component';
import { IfComponent } from './create-regra/if/if/if.component';
import { IteracaoComponent } from './create-regra/iteracao/iteracao.component';
import { RetornarComponent } from './create-regra/retornar/retornar.component';
import { ExecutarRegraComponent } from './create-regra/executar-regra/executar-regra.component';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root',
})
export class RegrasService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient,
    private shared: SharedService
  ) {}
  readonly URI = '/api/engine/regra';
  id = 0;
  objetoRegra;
  pasta;
  editControl = 0;
  @Output() atualizar = new EventEmitter();
  @Output() buttonHide = new EventEmitter();
  setObjetoRegra(obj) {
    this.objetoRegra = obj;
  }
  setPasta(pasta) {
    this.pasta = pasta;
  }
  setRegras(element, edit?: boolean) {
    if (!edit) {
      this.shared
        .getOnePastaRegras(element.schemaregras.pasta)
        .subscribe((v) => {
          v[`regras`] = JSON.parse(v[`regras`]);
          this.http
            .post(this.URI, element)
            .pipe(
              take(1),
              finalize(() => {
                v[`regras`].push(element.idregra);
                this.atualizar.emit(Object.assign({}, v));
                v[`regras`] = JSON.stringify(v[`regras`]);
                this.shared.putPastaRegras(v).subscribe();
              })
            )
            .subscribe();
        });
    } else {
      this.atualizarRegra(element).pipe(take(1)).subscribe();
    }
  }

  showEscopo(tipo, where, objeto, objEdit?: object) {
    let factory;
    let t = this.setComponente(tipo);
    if (t) {
      factory = this.componentFactoryResolver.resolveComponentFactory(t);
      const dynamic = document.createElement(tipo);
      const dynamicComponentRef = factory.create(this.injector, [], dynamic);
      if (objEdit) {
        dynamicComponentRef.instance['edicao'] = true;
        dynamicComponentRef.instance['id'] = objeto.id;
        dynamicComponentRef.instance['objEdit'] = objEdit;
      } else {
        dynamicComponentRef.instance['id'] = this.id;
      }
      dynamicComponentRef.instance['objeto'] = objeto;
      dynamicComponentRef.instance['tipo'] = tipo;
      this.applicationRef.attachView(dynamicComponentRef.hostView);
      document.getElementById(where.toString()).appendChild(dynamic);
      this.id += 1;
    }
  }
  remove(index) {
    if (document.getElementById(`escopo${index}`)) {
      document.getElementById(`escopo${index}`).remove();
    }
  }
  getRegras() {
    return this.http.get(this.URI);
  }
  getOneRegra(id) {
    return this.http.get(`${this.URI}/${id}`);
  }
  atualizarRegra(json) {
    return this.http.put(`${this.URI}`, json);
  }
  excluirRegra(where) {
    return this.http.delete(`${this.URI}`, { params: { id: where } });
  }
  setVariaveisEscopo(obj, valor, callback?: boolean) {
    if (!callback) {
      if (obj.variaveisLocal) {
        obj.variaveisLocal.push(valor);
      }
      obj.variaveis.push(valor);
    }
    obj[`itens`].forEach((element) => {
      if (element.variaveis) {
        element.variaveis.push(valor);
      } else if (element.itens.length > 0) {
        if (element.variaveisescopo) {
          element.variaveisescopo.push(valor);
        }
      }
      this.setVariaveisEscopo(element, valor, true);
    });
  }
  editarVariaveisEscopo(obj, valor, antigo, callback?: boolean) {
    if (!callback) {
      if (
        obj.variaveis &&
        obj.variaveis.indexOf(
          obj.variaveis.find(
            (v) => v.nome === antigo.nome && v.type === antigo.type
          )
        ) >= 0
      ) {
        obj.variaveis.splice(
          obj.variaveis.indexOf(
            obj.variaveis.find(
              (v) => v.nome === antigo.nome && v.type === antigo.type
            )
          ),
          1,
          valor
        );
        if (
          obj.variaveisLocal &&
          obj.variaveisLocal.indexOf(
            obj.variaveisLocal.find(
              (v) => v.nome === antigo.nome && v.type === antigo.type
            )
          ) >= 0
        ) {
          obj.variaveisLocal.splice(
            obj.variaveisLocal.indexOf(
              obj.variaveisLocal.find(
                (v) => v.nome === antigo.nome && v.type === antigo.type
              )
            ),
            1,
            valor
          );
        }
      }
    }
    if (obj[`itens`]) {
      obj[`itens`].forEach((element) => {
        if (element.variaveis) {
          const index = element.variaveis.indexOf(
            element.variaveis.find(
              (v) => v.nome === antigo.nome && v.type === antigo.type
            )
          );
          if (index >= 0) {
            element.variaveis.splice(index, 1, valor);
          }
        } else if (element.itens) {
          if (
            element.variaveisescopo &&
            element.variaveisescopo.indexOf(
              element.variaveisescopo.find(
                (v) => v.nome === antigo.nome && v.type === antigo.type
              )
            ) >= 0
          ) {
            element.variaveisescopo.splice(
              element.variaveisescopo.indexOf(
                element.variaveisescopo.find(
                  (v) => v.nome === antigo.nome && v.type === antigo.type
                )
              ),
              1,
              valor
            );
          }
        }
        this.editarVariaveisEscopo(element, valor, antigo, true);
      });
    }
  }
  excluirVariaveisEscopo(obj, where, callback?: boolean) {
    if (!callback) {
      if (obj.variaveis) {
        obj.variaveis.splice(
          obj.variaveis.indexOf(
            obj.variaveis.find(
              (v) => v.nome === where.nome && v.type === where.type
            )
          ),
          1
        );
        if (obj.variaveisLocal) {
          obj.variaveisLocal.splice(
            obj.variaveisLocal.indexOf(
              obj.variaveisLocal.find(
                (v) => v.nome === where.nome && v.type === where.type
              )
            ),
            1
          );
        }
      }
    }
    obj[`itens`].forEach((element) => {
      if (element.variaveis) {
        const index = element.variaveis.indexOf(
          element.variaveis.find(
            (v) => v.nome === where.nome && v.type === where.type
          )
        );
        if (index >= 0) {
          element.variaveis.splice(index, 1);
        }
      } else if (element.itens) {
        if (
          element.variaveisescopo &&
          element.variaveisescopo.indexOf(
            element.variaveisescopo.find(
              (v) => v.nome === where.nome && v.type === where.type
            )
          ) >= 0
        ) {
          element.variaveisescopo.splice(
            element.variaveisescopo.indexOf(
              element.variaveisescopo.find(
                (v) => v.nome === where.nome && v.type === where.type
              )
            ),
            1
          );
        }
      }
      this.excluirVariaveisEscopo(element, where, true);
    });
  }
  setComponente(tipo) {
    let retorno;
    switch (tipo) {
      case `escopo`:
        retorno = DynamicComponentComponent;
        break;
      case `atribuicao`:
        retorno = AtribuicaoComponent;
        break;
      case `if`:
        retorno = IfComponent;
        break;
      case `retorno`:
        retorno = RetornarComponent;
        break;
      case `break`:
        retorno = BreakComponent;
        break;
      case `enquanto`:
        retorno = EnquantoComponent;
        break;
      case `iteracao`:
        retorno = IteracaoComponent;
        break;
      case `executarRegra`:
        retorno = ExecutarRegraComponent;
        break;
      case `se`:
      case `senao`:
      case `senaose`:
        retorno = CondicaoComponent;
        break;
      default:
        break;
    }
    return retorno;
  }
  verificarModelos(obj, setErro) {
    if(obj.tipomodelo && obj.modelo){
      const objErro = { atualizacao: obj.nome };
      const path = obj.tipomodelo.split(`.`);
      this.shared
        .getModelos(path[0], path[1])
        .then((modelo) => {
          if (!(JSON.stringify(modelo) == JSON.stringify(obj.modelo))) {
            setErro.setErrors(objErro);
            this.resetModelo(obj);
          } else if (!modelo) {
            setErro.setErrors(objErro);
            this.resetModelo(obj);
          }
        })
        .catch((erro) => {
          setErro.setErrors(objErro);
          this.resetModelo(obj);
        });
    }
  }
  resetModelo(obj) {
    delete obj[`valor`];
    delete obj[`modelo`];
    delete obj[`tipomodelo`];
    delete obj[`tipoitems`];
  }
}
