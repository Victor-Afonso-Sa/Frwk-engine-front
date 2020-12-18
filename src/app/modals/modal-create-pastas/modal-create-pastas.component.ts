import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
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
    private router: ActivatedRoute
  ) {}
  @Input() editar = false;
  @Input() nome;
  @Input() mode;
  nomePasta = new FormControl(null, Validators.required);
  @Input() pastas;
  @Input() pasta;
  obj = {};
  errorMsg: string;
  @Input() indexPasta;
  ngOnInit(): void {}
  hide() {
    if (this.editar) {
      this.nomePasta.reset(this.nome);
    }
    this.modalService.hide();
  }
  criar() {
    let control = this.verificarExistencia(this.nomePasta.value);
    if (control == true) {
      this.errorMsg = 'Ja existe uma pasta com essa identificação...';
    } else if (this.mode == `modelo`) {
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
        .subscribe((value) => {
          if (value) {
            value[`regras`] = JSON.parse(value[`regras`]);
            this.pastas.push(value);
          }
        });
      this.modalService.hide(1);
    }
  }
  edit() {
    let control = this.verificarExistencia(this.nomePasta.value);
    if (control == true) {
      this.errorMsg = 'Essa pasta ja existe...';
    } else if (this.mode == `modelo`) {
      this.pasta.schemapastas.nomePasta = this.nomePasta.value;
      this.shared.atualizarPasta(this.pasta).subscribe();
      this.modalService.hide(1);
    }else if( this.mode == `regra`){
      const objAux = {
        nome: this.nomePasta.value,
        idpasta: this.pasta.idpasta,
        regras: JSON.stringify(this.pasta.regras)
      };
      this.shared.putPastaRegras(objAux).subscribe(
        v=>{},
        error=>{},
        ()=> this.pasta.nome = this.nomePasta.value
      );
      this.modalService.hide(1);
    }
  }
  verificarExistencia(value) {
    value = value.toString().trim().replace(/ /g, '.').toLowerCase();
    let control = false;
    this.pastas.forEach((pasta) => {
      if (pasta.idpasta == value && value != this.pasta?.idpasta) {
        control = true;
      }
    });
    return control;
  }
}
