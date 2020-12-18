import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { ModalsServicesService } from '../../modals/modals-services.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
  title;
  openModulo = false;
  pastas = [];
  modelos = [];
  @Output() responseConfirm = new EventEmitter();

  constructor(
    private modalService: ModalsServicesService,
    private shared: SharedService,
    private router: Router,
    private activated: ActivatedRoute,
    private confirmService: ConfirmService
  ) {}
  ngOnInit(): void {
    this.refresh();
    this.shared.excluirModelo.subscribe((data) => {
      if (data && Object.values(data).length > 0) {
        this.pastas.forEach((pasta) => {
          if (pasta.id == data.idPasta) {
            pasta.schemapastas.models.forEach((m) => {
              if (m.idModel == data.idModel) {
                pasta.schemapastas.models.splice(
                  pasta.schemapastas.models.indexOf(m),
                  1
                );
              }
            });
          }
          this.shared.atualizarPasta(pasta).subscribe();
        });
      }
    });
  }
  createPasta() {
    this.modalService.createPasta(this.pastas, `modelo`);
  }
  createModel(pasta) {
    this.shared.setPastaPath(pasta);
    this.router.navigate(
      [{ outlets: { dash: `modulo/${pasta.schemapastas.nomePasta}` } }],
      { relativeTo: this.activated, skipLocationChange: true }
    );
  }
  editModel(pasta, index) {
    this.shared.setEditar(pasta, pasta.schemapastas.models[index]);
    this.router.navigate(
      [
        {
          outlets: {
            dash: `modulo/${pasta.idpasta}/${index}`,
          },
        },
      ],
      { relativeTo: this.activated, skipLocationChange: true }
    );
  }
  dropPasta(pasta) {
    this.modalService.createConfirm(
      'Todos modelos serão excluidos deseja continuar?',
      'Deseja excluir'
    );
    this.confirmService.responseConfirm.subscribe((resp) => {
      if (resp) {
        if (this.pastas.indexOf(pasta) >= 0) {
          this.pastas.splice(this.pastas.indexOf(pasta), 1);
          this.shared.deletePasta(pasta).subscribe(()=>{},(error) => { this.modalService.createAlert("danger",error.statusText)});
        }
      }
    });
  }
  refresh() {
    this.shared
      .getPastas()
      .pipe(take(1))
      .subscribe((data: Array<any>) =>
        data
          ? data.forEach((pasta) => {
              let json = JSON.parse(pasta['schemapastas']);
              pasta['schemapastas'] = json;
              this.pastas = data;
            })
          : EMPTY,
          (error) => { this.modalService.createAlert('danger', error.statusText)}
      );
  }
  editPasta(pasta, pastas) {
    this.modalService.createPasta(pastas,`modelo`, pasta, pasta.schemapastas.nomePasta);
  }
  log(v) {
    console.log(v);
  }
}
