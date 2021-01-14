import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { TrilhaService } from 'src/app/modals/modalTrilha/trilha.service';
import { SharedService } from 'src/app/shared.service';
import { TiposService } from 'src/app/tipos/tipos/tipos.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-form-create-regra',
  templateUrl: './form-create-regra.component.html',
  styleUrls: ['./form-create-regra.component.scss'],
})
export class FormCreateRegraComponent implements OnInit {
  pastasModelos = [];
  nomePasta;
  edicao = false;
  regra;
  verificador;
  regraCopy;
  idObj;
  pasta;
  formulario: FormGroup;
  objetoEntrada = { nome: `entrada` };
  objetoSaida = { nome: `saida` };
  varControler = {
    setErrors: (erro) => {
      this.varControler.errors.push(erro);
    },
    errors: [],
  };
  parametros = [];
  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private service: RegrasService,
    private shared: SharedService,
    private confirmService: ConfirmService,
    private modal: ModalsServicesService,
    private typeService: TiposService,
    private trilhasService: TrilhaService
  ) {}

  ngOnInit() {
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      tipo: new FormControl('regra', [Validators.required]),
      entrada: new FormControl(null),
      saida: new FormControl(null),
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

    this.activated.params.forEach((e) => {
      if (e[`pasta`]) {
        this.nomePasta = e[`pasta`];
      }
      if (e['edit']) {
        this.edicao = true;
        this.idObj = e['edit'];
      }
      if (this.edicao) {
        const regra = this.activated.snapshot.data[`regra`];
        if (regra) {
          this.regra = regra;
          this.regraCopy = Object.assign({}, regra);
          this.formulario.patchValue({
            nome: this.regra.schemaregras.nome,
            entrada: this.regra.schemaregras.entrada.type,
            saida: this.regra.schemaregras.saida.type,
          });
          this.objetoEntrada = Object.assign(
            {},
            this.regra.schemaregras.entrada
          );
          this.objetoSaida = Object.assign({}, this.regra.schemaregras.saida);
          this.verificarModelos(this.objetoEntrada);
          this.verificarModelos(this.objetoSaida);
        }
      }
    });
    this.shared.getOnePastaRegras(this.nomePasta).subscribe((pasta) => {
      if (pasta) {
        pasta[`regras`] = JSON.parse(pasta[`regras`]);
        this.pasta = pasta;
      }
    });
    this.formulario.controls.nome.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        filter((valor) => valor && valor.length > 0)
      )
      .subscribe((valor) => this.verificarNome(valor));
  }
  async salvarIr() {
    const schema = await this.saveRegra();
    this.irRegra(schema);
  }
  async EditarIr() {
    this.editRegra();
    this.irRegra(this.regra);
  }
  async salvar() {
    this.saveRegra();
    this.modal.createToast(`success`, `Regra Salva com sucesso`);
  }
  async editar() {
    this.editRegra();
    this.modal.createToast(`success`, `Regra Salva com sucesso`);
  }
  async saveRegra() {
    const idregra = `${
      this.nomePasta
    }.${this.formulario.value.nome.trim().replace(/ /g, '.').toLowerCase()}`;
    this.formulario.value.variaveisLocal = [];
    this.formulario.value.variaveis = [];
    this.formulario.value.itens = [];
    this.formulario.value.entrada = Object.assign({}, this.objetoEntrada);
    this.formulario.value.saida = Object.assign({}, this.objetoSaida);
    this.formulario.value.variaveis.push(
      this.formulario.value.entrada,
      this.formulario.value.saida
    );
    this.formulario.value.pasta = this.nomePasta;
    const schema = { idregra: idregra, schemaregras: {} };
    schema.schemaregras = this.formulario.value;
    this.service.salvarRegra(schema);
    return schema;
  }
  irRegra(schema) {
    this.service.id = 0;
    this.service.setObjetoRegra(schema);
    if (this.edicao) {
      this.router.navigate(
        [{ outlets: { primary: [`regras`, `edit`, this.idObj], dash: null } }],
        { replaceUrl: true, fragment: `top` }
      );
    } else {
      this.router.navigate(
        [{ outlets: { primary: [`regras`, `create`], dash: null } }],
        { replaceUrl: true, skipLocationChange: true, fragment: `top` }
      );
    }
  }
  async editRegra() {
    const entrada = this.objetoEntrada;
    const saida = this.objetoSaida;
    this.regra.schemaregras.nome = this.formulario.value.nome;
    this.alterarFixas(
      this.regra.schemaregras,
      entrada,
      this.regra.schemaregras.entrada
    );
    this.alterarFixas(
      this.regra.schemaregras,
      saida,
      this.regra.schemaregras.saida
    );
    this.regra.schemaregras.entrada = entrada;
    this.regra.schemaregras.saida = saida;
    this.service.editarRegra(this.regra);
  }
  excluir() {
    this.modal.createConfirm(
      `Se excluir todas trilhas também serão excluidas`,
      `Deseja excluir`,
      `excluir`,
      `cancelar`
    );
    this.confirmService.responseConfirm
      .pipe(
        first(),
        distinctUntilChanged(),
        filter((v) => v && v != false),
        switchMap((v) =>
          this.shared.getOnePastaRegras(this.regra.schemaregras.pasta)
        )
      )
      .pipe(
        map((v) => {
          if (v) {
            v[`regras`] = JSON.parse(v[`regras`]);
            v[`regras`].splice(
              v[`regras`].indexOf(
                v[`regras`].find((regra) => regra == this.idObj)
              ),
              1
            );
            this.service.atualizar.emit(Object.assign({}, v));
            v[`regras`] = JSON.stringify(v[`regras`]);
            return v;
          }
        }),
        switchMap((pasta) => this.shared.putPastaRegras(pasta))
      )
      .pipe(
        take(1),
        switchMap((value) =>
          this.trilhasService.excluirTrilhaByIdRegra(this.idObj)
        )
      )
      .subscribe(
        () => {},
        () => {},
        () => {
          this.service.excluirRegra(this.idObj).subscribe();
          this.router.navigate(
            [{ outlets: { primary: [`regras`], dash: null } }],
            {}
          );
        }
      );
  }
  async setType(tipo, onde) {
    if (onde == 'saida') {
      this.resetModelo(this.objetoSaida);
      this.objetoSaida[`type`] = tipo;
      switch (tipo) {
        case `integer`:
          this.objetoSaida[`valor`] = Number(0);
          break;
        case `boolean`:
          this.objetoSaida[`valor`] = false;
          break;
        case `string`:
          this.objetoSaida[`valor`] = '';
          break;

        default:
          break;
      }
    } else {
      this.resetModelo(this.objetoEntrada);
      this.objetoEntrada[`type`] = tipo;
    }
  }
  alterarFixas(obj, valor, antigo) {
    if (antigo != valor) {
      this.service.editarVariaveisEscopo(obj, valor, antigo);
    }
  }
  verificarNome(nome) {
    const id = `${this.nomePasta}.${nome
      .trim()
      .replace(/ /g, '.')
      .toLowerCase()}`;
    if (
      this.pasta.regras.find((regra) => {
        if (this.edicao) {
          if (
            (regra.nome == nome && nome != this.regraCopy.schemaregras.nome) ||
            (regra.idregra == id && id != this.regraCopy.idregra)
          ) {
            return true;
          }
        } else if (regra.nome == nome || regra.idregra == id) {
          return true;
        }
      })
    ) {
      this.formulario.controls.nome.setErrors({ exist: true });
      return true;
    }
  }
  async setarray(tipo, onde) {
    if (onde == 'saida') {
      this.resetModelo(this.objetoSaida);
      this.objetoSaida[`tipoitems`] = tipo;
      this.objetoSaida[`valor`] = [];
    } else {
      this.resetModelo(this.objetoEntrada);
      this.objetoEntrada[`tipoitems`] = tipo;
    }
  }
  async setModelo(tipo, onde) {
    if (onde == 'saida') {
      this.resetModelo(this.objetoSaida);
      this.objetoSaida[`tipomodelo`] = tipo;
      this.objetoSaida[`modelo`] = await this.getModelo(tipo);
      const valor = await this.shared.jsonGenerate(this.objetoSaida[`modelo`]);
      if (this.objetoSaida[`tipoitems`]) {
        this.objetoSaida[`valor`] = [valor];
      } else {
        this.objetoSaida[`valor`] = valor;
      }
    } else {
      this.resetModelo(this.objetoEntrada);
      this.objetoEntrada[`tipomodelo`] = tipo;
      this.objetoEntrada[`modelo`] = await this.getModelo(tipo);
    }
    this.varControler.errors.splice(
      this.varControler.errors.indexOf(
        this.varControler.errors.find((v) => v.atualizacao == onde)
      ),
      1
    );
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
  verificacao(formulario) {
    if ('valor' in this.objetoSaida) {
      return this.typeService.verificaType(formulario, this.objetoEntrada);
    } else {
      return true;
    }
  }
  testar() {
    this.modal.createTest(this.idObj, this.regra.schemaregras.entrada);
  }
  verificarModelos(obj) {
    this.service.verificarModelos(obj, this.varControler);
  }
  openTrilhas() {
    this.modal.createTrilha(this.idObj);
  }
  getModelo(tipo) {
    const path = tipo.split(`.`);
    for (let index = 0; index < this.pastasModelos.length; index++) {
      const models = this.pastasModelos[index].schemapastas.models;
      const indice = models.findIndex(
        (model) => model.idpasta == path[0] && model.idModel == path[1]
      );
      if (indice >= 0) {
        return JSON.parse(models[indice].jsonModel);
      }
    }
  }
}
