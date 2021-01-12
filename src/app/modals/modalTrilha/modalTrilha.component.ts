import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { TrilhaService } from './trilha.service';

@Component({
  selector: 'app-modalTrilha',
  templateUrl: './modalTrilha.component.html',
  styleUrls: ['./modalTrilha.component.scss'],
})
export class ModalTrilhaComponent implements OnInit {
  @Input() idregra;
  @Input() trilhas = [];
  display = false;
  jsonExecucao;
  constructor(
    private trilhaService: TrilhaService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}
  excluirTrilha(id) {
    this.trilhaService
      .excluirTrilha(id)
      .pipe(
        switchMap((value) => {
          return this.trilhaService.getTrilhas(this.idregra);
        })
      )
      .subscribe(
        (value) => {
          this.trilhas = value;
        },
        (e) => {},
        () => {}
      );
  }
  setClass(id) {
    this.sharedService.setClasse(
      id,
      'list-group-item d-flex justify-content-between align-items-center li-trilha',
      'list-group-item d-flex justify-content-between align-items-center active'
    );
  }
  setTrilha(trilha) {
    this.display = false;
    this.jsonExecucao = trilha.jsonexecucao;
    setInterval(() => {
      this.display = true;
    }, 500);
  }
}
