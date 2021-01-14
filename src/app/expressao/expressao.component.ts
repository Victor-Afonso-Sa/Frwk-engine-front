import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IActionMapping } from '@circlon/angular-tree-component';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
  tap,
} from 'rxjs/operators';
import { ParametrosService } from 'src/app/parametros/parametros.service';
import { SharedService } from 'src/app/shared.service';
import { NewVarService } from '../modals/modal-new-var/new-var.service';
import { ModalsServicesService } from '../modals/modals-services.service';

@Component({
  selector: 'expressao',
  templateUrl: './expressao.component.html',
  styleUrls: ['./expressao.component.scss',`../modals/modal-style.css`],
})
export class ExpressaoComponent implements OnInit {
  @Input() model;
  @Input() edit;
  @Input() variaveis = [];
  @Input() formulario;
  @Input() objeto = {};
  parametros = [];
  valor = new FormControl(
    this.objeto[`valor`] ? JSON.stringify(this.objeto[`valor`]) : ` `,
    Validators.required
  );
  verificado = false;
  jsonError = true;
  msg;
  cursoPosition;
  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => {
        this.insertValue(node.data.id);
      },
    },
  };
  options = {
    displayField: 'nome',
    actionMapping: this.actionMapping,
  };
  comparacao = [
    {label:`igual : ( == )`,valor:` == `},
    {label:`diferente : ( != )`,valor:` != `},
    {label:`maior : ( > )`,valor:` > ` },
    {label:`menor : ( < )`,valor:` < ` },
    {label:`maior ou igual : ( >= )`,valor:` >= `},
    {label:`menor ou igual : ( <= )`,valor:` <= `},
    {label:`e: ( && )`,valor:` && `},
    {label:`ou: ( || )`,valor:` || `},

  ];
  glossario =[
    {label:`Item do Array`, valor:` _array[indice] `, tooltip:`Arrays iniciam em 0`},
  ]
  @Output() jsonEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private shared: SharedService,
    private varService: NewVarService,
    private paramsService: ParametrosService,
    private modalsSevice: ModalsServicesService
  ) {}

  ngOnInit() {
    this.valor.setValue(this.objeto[`valor`]);
    this.valor.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        tap((v) => {
          this.verificado = false;
          this.jsonError = true;
          this.jsonEmitter.emit(this.jsonError);
        }),
        filter((valor) => valor && valor.length > 0)
      )
      .subscribe((valor) => {
        this.verificado = false;
        this.jsonError = true;
        this.verificarValor(valor);
      });
    this.varService.modalClose
      .pipe(take(1))
      .subscribe((close) =>
        this.edit ? (this.objeto[`valor`] = this.edit[`valor`]) : null
      );
    this.paramsService.getParametros().subscribe((pastaParams: Array<any>) => {
      this.modalsSevice
        .createVarForTree(this.paramsService.setParametros(pastaParams))
        .then((params) => (this.parametros = params));
    });
  }
  async verificarValor(value) {
    try {
      let expressao = ``;
      const array = [...this.variaveis, ...this.parametros];
      if (
        array &&
        array.length > 0 &&
        (this.objeto[`type`] != 'modelo' ||
          this.objeto[`type`] != 'entrada' ||
          this.objeto[`type`] != 'saida')
      ) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] != this.objeto) {
            expressao += await this.varService.verificadorEval(array[i]);
          }
        }
      }
      expressao += await this.varService.verificadorType(this.objeto, value);
      eval(expressao);
      this.jsonError = true;
      this.msg = `Valido`;
      this.jsonEmitter.emit(this.jsonError);
    } catch (error) {
      this.verificado = true;
      this.jsonError = false;
      this.msg = `${error.name}: ${error.message}`;
      this.jsonEmitter.emit(this.jsonError);
    }
  }

  insertValue(add) {
    add = ` ${add} `;
    if (!this.objeto[`valor`]) {
      this.objeto[`valor`] = add;
    } else if (this.cursoPosition >= 0) {
      const array = Array.from(this.objeto[`valor`]);
      array.splice(this.cursoPosition, 0, add);
      this.objeto[`valor`] = array.join('');
    } else {
      this.objeto[`valor`] += add;
    }
  }
  getCursorPosition(event) {
    this.cursoPosition = event.target.selectionStart;
  }
  clearCoor() {
    document.getElementById('demo').innerHTML = '';
  }
}
