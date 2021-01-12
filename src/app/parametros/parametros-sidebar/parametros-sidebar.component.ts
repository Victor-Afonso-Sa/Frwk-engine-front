import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { SharedService } from 'src/app/shared.service';
import { ParametrosService } from '../parametros.service';

@Component({
  selector: 'app-parametros-sidebar',
  templateUrl: './parametros-sidebar.component.html',
  styleUrls: ['./parametros-sidebar.component.css'],
})
export class ParametrosSidebarComponent implements OnInit {
  parametros = [];
  display = false;
  constructor(
    private modals: ModalsServicesService,
    private paramsService: ParametrosService,
    private confirmService: ConfirmService,
    private sharedService: SharedService,
    private router: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit() {
    this.refresh();
    this.paramsService.atualizar
      .pipe(filter((v) => v && v != null))
      .subscribe((v) => this.refresh());
  }
  refresh() {
    this.paramsService
      .getParametros()
      .pipe(
        filter((params: Array<any>) => params.length > 0),
        map((params: Array<any>) => {
          for (let index = 0; index < params.length; index++) {
            const element = params[index];
            element.parametros = JSON.parse(element.parametros);
          }
          return params;
        })
      )
      .subscribe(
        (params: Array<any>) => (this.parametros = params),
        () => {this.modals.createAlert('danger', "Servidor fora do ar")},
        () => {
          this.display = true;
        }
      );
  }
  createPasta() {
    this.modals.createPasta(this.parametros, `parametros`);
  }
  deletePasta(pasta) {
    this.modals.createConfirm(
      'Todos parâmetros serão excluidos deseja continuar?',
      'Deseja excluir'
    );
    this.confirmService.responseConfirm.subscribe((resp) => {
      if (resp) {
        if (this.parametros.indexOf(pasta) >= 0) {
          this.parametros.splice(this.parametros.indexOf(pasta), 1);
          this.paramsService.deleteParametros(pasta.idpasta).subscribe(
            () => {},
            (error) => {
              this.modals.createAlert('danger', error.statusText);
            }
          );
        }
      }
    });
  }
  editPasta(pasta) {
    this.modals.createPasta(this.parametros, `parametros`, pasta, pasta.nome);
  }
  createParametro(pasta) {
    this.router.navigate(
      [
        {
          outlets: {
            dash: `form/${pasta.idpasta}`,
          },
        },
      ],
      { relativeTo: this.active }
      // {skipLocationChange: true }
    );
  }
  editParam(pasta, params) {
    this.router.navigate(
      [
        {
          outlets: {
            dash: `form/${pasta.idpasta}/${params.id}`,
          },
        },
      ],
      { relativeTo: this.active }
      // {skipLocationChange: true }
    );
  }
  setClasse(id) {
    this.sharedService.setClasse(id);
  }
}
