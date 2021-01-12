import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css'],
})
export class ModuloComponent implements OnInit {
  jsonError = true;
  nomeError = false;
  verificado = false;
  @Input() pastaId;
  index;
  @Input() modelValues = {};
  pastaValues = {};
  @Input() modelValuesCopy = {};
  @Input() edicao = false;
  reponsemModal = new EventEmitter();
  @Input() formularioAux;
  msg = `json valido`;
  f = new FormControl();
  constructor(
    private activeRouter: ActivatedRoute,
    private shared: SharedService,
    private route: Router,
    private modals: ModalsServicesService
  ) {}
  ngOnInit(): void {
    this.activeRouter.params.forEach((data) => {
      this.pastaId = data['pasta'];
      if (data['edit']) {
        this.edicao = true;
        this.index = data[`edit`];
      }
      this.pastaValues = this.shared.getEditarModelo();
      if (this.edicao) {
        this.shared
          .getPastaById(this.pastaId)
          .pipe(take(1))
          .subscribe((data) => {
            if (data) {
              let schema = JSON.parse(data[`schemapastas`]);
              this.modelValues = schema[`models`][this.index];
              Object.assign(this.modelValuesCopy, this.modelValues);
              this.verificado = false;
            }
          });
      }
    });
  }
  on(form) {
    form.value.idpasta = this.pastaValues['idpasta'];
    form.value.idModel = form.value.nomeModel
      .toString()
      .trim()
      .replace(/ /g, '.')
      .toLowerCase();
    if (this.verificarModel(form.value)) {
      this.nomeError = true;
    } else {
      this.pastaValues['schemapastas']['models'].push(form.value);
      this.shared.atualizarPasta(this.pastaValues).pipe(take(1)).subscribe();
      this.route.navigate(['model']);
    }
  }
  onEdit(form) {
    form.value.idpasta = this.pastaValues['idpasta'];
    form.value.idModel = form.value.nomeModel
      .toString()
      .trim()
      .replace(/ /g, '.')
      .toLowerCase();
    if (this.verificarModel(form.value) && !form.controls.nomeModel.pristine) {
      this.nomeError = true;
    } else {
      this.pastaValues['schemapastas']['models'].splice(
        this.index,
        1,
        form.value
      );
      this.shared.atualizarPasta(this.pastaValues).subscribe();
      this.route.navigate(['model']);
    }
  }
  setFormAux(form) {
    this.formularioAux = form;
  }
  excluir(form) {
    this.pastaValues[`schemapastas`][`models`].splice(this.index, 1);
    this.shared.atualizarPasta(this.pastaValues).subscribe();
    this.route.navigate(['model']);
  }
  resetForm(form) {
    if (this.edicao) {
      form.reset(this.modelValuesCopy);
    } else {
      form.reset();
    }
  }
  verificarModel(value) {
    let control = false;
    let models = this.pastaValues['schemapastas']['models'];
    if (models.length > 0) {
      models.forEach((model) => {
        if (model.nomeModel == value.nomeModel) {
          control = true;
        }
      });
    }
    if (value.nomeModel == this.modelValuesCopy['nomeModel']) {
      control = false;
    }
    return control;
  }
  jsonTest(string) {
    this.verificado = true;
    try {
      this.shared
        .jsonGenerate(JSON.parse(string))
        .then((data) => {
          this.jsonError = true;
        })
        .catch((error) => {
          if (error.message == `schema is undefined`) {
            this.msg = `Type indefinido ou faltando propriedades`;
          } else {
            this.msg = error;
          }
          this.jsonError = false;
        });
    } catch (error) {
      this.msg = error.message;
      this.jsonError = false;
    }
  }
}
