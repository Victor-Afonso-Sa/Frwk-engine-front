import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
  tap,
} from 'rxjs/operators';
import { ParametrosService } from 'src/app/parametros/parametros.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-modal-create-pastas',
  templateUrl: './modal-create-pastas.component.html',
  styleUrls: ['./modal-create-pastas.component.css', '../modal-style.css'],
})
export class ModalCreatePastasComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private shared: SharedService,
    private paramsService: ParametrosService
  ) {}
  @Input() editar = false;
  @Input() nome;
  @Input() mode;
  nomePasta = new FormControl(null, Validators.required);
  @Input() pastas;
  @Input() pasta;
  obj = {};
  errorMsg: string;
  click = false;
  @Input() indexPasta;
  disable;
  ngOnInit(): void {
    this.nomePasta.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        filter((valor) => valor && valor.length > 0),
        tap((valor) => {
          this.disable = false;
          this.errorMsg = null;
        })
      )
      .subscribe((value) => {
        if (this.verificarExistencia(value)) {
          this.disable = true;
          this.errorMsg = 'Ja existe uma pasta com essa identificação...';
        }
      });
  }
  hide() {
    if (this.editar) {
      this.nomePasta.reset(this.nome);
    }
    this.modalService.hide();
  }
  criar() {
    if (this.mode == `modelo`) {
      this.obj['nomePasta'] = this.nomePasta.value;
      this.obj['models'] = [];
      const id = this.nomePasta.value
        .toString()
        .trim()
        .replace(/ /g, '')
        .toLowerCase();
      let body = { idpasta: id, schemapastas: this.obj };
      this.shared.criarPastas(body, this.pastas);
      this.modalService.hide(1);
    } else if (this.mode == `regra`) {
      this.obj['nome'] = this.nomePasta.value;
      this.obj['idpasta'] = this.nomePasta.value
        .toString()
        .trim()
        .replace(/ /g, '')
        .toLowerCase();
      this.obj['regras'] = '[]';
      this.shared
        .postPastaRegras(this.obj)
        .pipe(take(1))
        .subscribe(
          (value) => {
            if (value) {
              value[`regras`] = JSON.parse(value[`regras`]);
              this.pastas.push(value);
            }
          },
          () => {},
          () => this.modalService.hide(1)
        );
    } else if (this.mode == `parametros`) {
      this.obj['nome'] = this.nomePasta.value;
      this.obj['idpasta'] = this.nomePasta.value
        .toString()
        .trim()
        .replace(/ /g, '')
        .toLowerCase();
      this.obj['parametros'] = '[]';
      this.paramsService
        .postParametros(this.obj)
        .pipe(take(1))
        .subscribe(
          (value) => {
            if (value) {
              value[`parametros`] = JSON.parse(value[`parametros`]);
              this.pastas.push(value);
            }
          },
          () => {},
          () => this.modalService.hide(1)
        );
    }
  }
  edit() {
    if (this.mode == `modelo`) {
      this.pasta.schemapastas.nomePasta = this.nomePasta.value;
      this.shared.atualizarPasta(this.pasta).subscribe();
      this.modalService.hide(1);
    } else if (this.mode == `regra`) {
      const objAux = {
        nome: this.nomePasta.value,
        idpasta: this.pasta.idpasta,
        regras: JSON.stringify(this.pasta.regras),
      };
      this.shared.putPastaRegras(objAux).subscribe(
        (v) => {},
        (error) => {},
        () => {
          this.pasta.nome = this.nomePasta.value;
          this.modalService.hide(1);
        }
      );
    } else if (this.mode == `parametros`) {
      const objAux = {
        nome: this.nomePasta.value,
        idpasta: this.pasta.idpasta,
        parametros: JSON.stringify(this.pasta.parametros),
      };
      this.paramsService.putParametros(objAux).subscribe(
        (v) => {},
        (error) => {},
        () => {
          this.pasta.nome = this.nomePasta.value;
          this.modalService.hide(1);
        }
      );
    }
  }
  verificarExistencia(value) {
    const id = value.toString().trim().replace(/ /g, '.').toLowerCase();
    let control = false;
    this.pastas.forEach((pasta) => {
      if (
        (pasta.idpasta == id && id != this.pasta?.idpasta) ||
        (pasta.nome == value && value != this.pasta?.nome)
      ) {
        control = true;
      }
    });
    return control;
  }
}
