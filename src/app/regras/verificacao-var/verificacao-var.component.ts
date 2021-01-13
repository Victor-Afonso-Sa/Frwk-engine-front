import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { filter, repeat } from 'rxjs/operators';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-verificacao-var',
  templateUrl: './verificacao-var.component.html',
  styleUrls: ['./verificacao-var.component.scss'],
})
export class VerificacaoVarComponent implements OnInit, OnChanges {
  @Input() variaveisArray;
  @Input() variavel;
  @Input() expressao;
  @Input() only;
  @Input() executar;
  label = '';
  @Output() expressaoEmitter = new EventEmitter();

  @Input() errorControlExpressao = false;
  @Input() errorControlVar = false;

  @Input() tootltipErroExpressao = null;
  @Input() tootltipErroVar = null;

  displayVar = true;
  constructor(
    private regrasService: RegrasService,
    private varService: NewVarService
  ) {}

  ngOnInit() {
    this.varService.verificacao
      .pipe(filter((v) => v != false || v != null || v != undefined))
      .subscribe((v) =>
        this.executarVerificacoes(this.executar ? this.executar : null),
        ()=>{},
        ()=>{ this.executarVerificacoes(this.executar ? this.executar : null) }
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
    if (this.variavel[`id`] && this.variavel[`id`].split(`.`).length == 1) {
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
    }else{
      this.displayVar = false;
    }
    if (veri) {
      this.errorControlVar = true;
      this.tootltipErroVar = `${this.label} ${this.variavel.id} não existe`;
    } else {
      this.errorControlVar = false;
      this.tootltipErroVar = null;
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
