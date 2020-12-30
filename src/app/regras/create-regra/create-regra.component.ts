import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { send } from 'process';
import { distinctUntilChanged, first, take } from 'rxjs/operators';
import { DeactivateIt } from 'src/app/guards/DeactivateIt';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';
import { OptionService } from 'src/app/modals/modal-regra-option/option.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-create-regra',
  templateUrl: './create-regra.component.html',
  styleUrls: ['./create-regra.component.scss'],
})
export class CreateRegraComponent implements OnInit, AfterViewInit {
  constructor(
    private service: RegrasService,
    private route: Router,
    private active: ActivatedRoute,
    private modals: ModalsServicesService
  ) {}
  enviado = false;
  objeto;
  objetoEditCopy = {};
  edit = false;
  title = 'Crie sua regra';
  idregra;
  display = false;
  ngOnInit() {
    this.objeto = this.service.objetoRegra;
    this.active.params.forEach((element) => {
      if (element['id']) {
        this.edit = true;
        this.idregra = element[`id`];
      } else {
        this.display = true;
      }
    });
    if (!this.objeto) {
      this.route.navigate([{ outlets: { primary: [`regras`], dash: null } }]);
    }
  }
  ngAfterViewInit() {
    if (this.edit && this.objeto) {
      setInterval(() => {
        this.title = 'Editar: ' + this.objeto.schemaregras.nome;
        this.display = true;
      });
      this.createEdit();
    }
  }
  regra() {
    this.modals.createOption('bodyRegra', this.objeto['schemaregras']);
  }
  salvar() {
    this.service.editarRegra(this.objeto);
    this.enviado = true;
    this.route.navigate([{ outlets: { primary: [`regras`], dash: null } }]);
  }
  voltar() {
    this.route.navigate([{ outlets: { primary: [`regras`], dash: null } }]);
  }
  createEdit() {
    if (this.objeto) {
      this.objetoEditCopy = JSON.parse(JSON.stringify(this.objeto));
      this.objeto['schemaregras']['itens'].forEach((element) => {
        this.service.showEscopo(
          element.tipo,
          'bodyRegra',
          element,
          this.objeto
        );
      });
    }
  }
  editar() {
    this.service.editarRegra(this.objeto);
    this.enviado = true;
    this.route.navigate([{ outlets: { primary: [`regras`], dash: null } }]);
  }
}
