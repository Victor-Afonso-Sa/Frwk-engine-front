import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { filter, first, repeat } from 'rxjs/operators';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-verificacao-var',
  templateUrl: './verificacao-var.component.html',
  styleUrls: ['./verificacao-var.component.scss'],
})
export class VerificacaoVarComponent implements OnInit, OnChanges {
  @Input() errorControl = false;
  @Input() tootltipErro = null;
  @Input() variaveisArray;
  @Input() variavel;
  @Input() expressao;
  @Input() only;
  @Input() executar;
  label = '';
  @Output() expressaoEmitter = new EventEmitter();

  constructor(
    private regrasService: RegrasService,
    private varService: NewVarService
  ) {}

  ngOnInit() {
    this.varService.verificacao
      .pipe(filter((v) => v != false || v != null || v != undefined))
      .subscribe((v) =>
        this.executarVerificacoes(this.executar ? this.executar : null)
      );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes[`variaveisArray`] ||
      changes[`variavel`] ||
      changes[`expressao`]
    ) {
      this.executarVerificacoes(this.executar ? this.executar : null);
    }
  }
  verificarVariaveis() {
    let veri;
    if (this.variavel[`id`] && this.variavel[`id`].split(`.`).length <= 0) {
      if (this.only) {
        veri = this.regrasService.verificarVariaveis(
          this.variaveisArray,
          this.variavel,
          this.only
        );
        this.label = this.only;
      } else {
        veri = this.regrasService.verificarVariaveis(
          this.variaveisArray,
          this.variavel
        );
      }
    }
    if (veri) {
      this.errorControl = true;
      this.tootltipErro = `${this.label} ${this.variavel.id} não existe`;
    } else {
      this.errorControl = false;
      this.tootltipErro = null;
    }
  }
  verificarExpressao() {
    this.expressaoEmitter.emit([this.variavel, this.expressao]);
  }
  executarVerificacoes(qual) {
    if (
      this.variaveisArray &&
      this.variavel &&
      (!qual || qual != `expressao`)
    ) {
      this.verificarVariaveis();
    }
    if (this.expressao && this.variavel && (!qual || qual != `variaveis`)) {
      this.verificarExpressao();
    }
  }
}
