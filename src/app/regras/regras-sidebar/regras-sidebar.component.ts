import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { SharedService } from 'src/app/shared.service';
import { RegrasService } from '../regras.service';

@Component({
  selector: 'app-regras-sidebar',
  templateUrl: './regras-sidebar.component.html',
  styleUrls: ['./regras-sidebar.component.scss'],
})
export class RegrasSidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private service: RegrasService,
    private modalService: ModalsServicesService,
    private sharedService: SharedService,
    private confirmService: ConfirmService
  ) {}
  classe = false;
  pastas = [];
  nomes = [];
  display = false;
  ngOnInit() {
    this.refresh();
    this.service.atualizar.pipe().subscribe(
      (e) => {
        this.pastas.splice(
          this.pastas.indexOf(
            this.pastas.find((p) => p.idpasta == e[`idpasta`])
          ),
          1,
          e
        );
      },
      () => {},
      () => {
        this.display = true;
      }
    );
  }
  refresh() {
    this.sharedService
      .getPastaRegras()
      .pipe(
        map((pastas: Array<any>) => {
          if (pastas) {
            for (let index = 0; index < pastas.length; index++) {
              const pasta = pastas[index];
              pasta.regras = JSON.parse(pasta.regras);
            }
            return pastas;
          }
        })
      )
      .subscribe(
        (pastas) => (this.pastas = pastas),
        () => {},
        () => {
          this.display = true;
        }
      );
  }
  createRegra(pasta) {
    this.router.navigate([{ outlets: { dash: `form/${pasta.idpasta}` } }], {
      skipLocationChange: true,
    });
  }
  edit(pasta, item) {
    item = item.trim().replace(/ /g, '.').toLowerCase();
    this.router.navigate(
      [{ outlets: { dash: `form/${pasta.idpasta}/${item}` } }],
      { skipLocationChange: true }
    );
  }

  createPasta() {
    this.modalService.createPasta(this.pastas, `regra`);
  }
  editPasta(pasta) {
    this.modalService.createPasta(this.pastas, `regra`, pasta, pasta.nome);
  }
  deletePasta(pasta) {
    this.modalService.createConfirm(
      `Se excluir todas regras também sera excluidas`,
      `Deseja excluir`,
      `excluir`,
      `cancelar`
    );
    this.confirmService.responseConfirm
      .pipe(
        first(),
        distinctUntilChanged(),
        filter((v) => v && v != false),
        tap((v) => {
          this.excluirRegras(pasta);
          this.pastas.splice(this.pastas.indexOf(pasta), 1);
        }),
        switchMap((v) => this.sharedService.deletePastaRegras(pasta.idpasta))
      )
      .pipe(take(1))
      .subscribe();
  }
  excluirRegras(pasta) {
    if (pasta.regras.length > 0) {
      for (let index = 0; index < pasta.regras.length; index++) {
        const element = pasta.regras[index];
        this.service.excluirRegra(element.idregra).subscribe();
      }
    }
  }
  getNomeRegra(id) {
    return this.nomes.find((regra) => regra.id == id);
  }
  setNomes() {
    for (let index = 0; index < this.pastas.length; index++) {
      const element = this.pastas[index].regras;
      for (let index = 0; index < element.length; index++) {
        const regra = element[index];
        this.service
          .getOneRegra(regra)
          .pipe(
            map((r) => (r[`schemaregras`] = JSON.parse(r[`schemaregras`]))),
            filter((regra) => regra && regra != null)
          )
          .subscribe((r) => {
            this.nomes.push({ nome: r.nome, id: regra });
          });
      }
    }
  }
  setClasse(id) {
    this.sharedService.setClasse(id);
  }
}
