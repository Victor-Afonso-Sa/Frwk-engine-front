import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { IActionMapping } from '@circlon/angular-tree-component';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
  tap,
} from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { NewVarService } from '../new-var.service';

@Component({
  selector: 'expressao',
  templateUrl: './expressao.component.html',
  styleUrls: ['./expressao.component.scss'],
})
export class ExpressaoComponent implements OnInit {
  @Input() model;
  @Input() edit;
  @Input() variaveis;
  @Input() formulario;
  @Input() objeto = {};
  valor = new FormControl(
    this.objeto[`valor`] ? JSON.stringify(this.objeto[`valor`]) : ` `,
    Validators.required
  );
  verificado = false;
  jsonError = true;
  msg;
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
  @Output() jsonEmitter: EventEmitter<boolean> = new EventEmitter();
  // @Input() ;

  constructor(
    private shared: SharedService,
    private varService: NewVarService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.valor.setValue(this.objeto[`valor`]);
    this.valor.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        tap(v => {this.verificado = false;this.jsonError = true;}),
        filter((valor) => valor && valor.length > 0)
      )
      .subscribe((valor) => {
        this.verificado = false;
        this.jsonError = true;
        if (this.objeto[`modelo`]) {
          this.jsonTest(valor);
        } else {
          this.verificarValor(valor);
        }
      });
    this.varService.modalClose
      .pipe(take(1))
      .subscribe((close) =>
        this.edit ? (this.objeto[`valor`] = this.edit[`valor`]) : null
      );
  }
  jsonTest(json) {
    this.verificado = true;
    this.isValidJSON(json);
    this.jsonEmitter.emit(this.jsonError);
  }
  isValidJSON(json) {
    try {
      this.msg = `VALIDO`;
      return this.shared.isValidJSON(json);
    } catch (e) {
      this.msg = e;
    }
  }
  async verificarValor(value) {
    try {
      let expressao = ``;
      if (
        this.variaveis.length > 0 &&
        (this.objeto[`type`] != 'modelo' ||
          this.objeto[`type`] != 'entrada' ||
          this.objeto[`type`] != 'saida')
      ) {
        for (let i = 0; i < this.variaveis.length; i++) {
          if (this.variaveis[i] != this.objeto) {
            expressao += await this.varService.verificadorEval(
              this.variaveis[i]
            );
          }
        }
      }
      if (this.objeto[`type`] != `modelo`) {
        expressao += await this.varService.verificadorType(this.objeto, value);
        eval(expressao);
      }
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
    if (!this.objeto[`valor`]) {
      this.objeto[`valor`] = `${add}`;
    } else {
      this.objeto[`valor`] += `${add}`;
    }
  }
}
