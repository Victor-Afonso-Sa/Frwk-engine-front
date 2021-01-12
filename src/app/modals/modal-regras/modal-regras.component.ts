import { Component, OnInit } from '@angular/core';
import { IActionMapping } from '@circlon/angular-tree-component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegrasService } from 'src/app/regras/regras.service';

@Component({
  selector: 'app-modal-regras',
  templateUrl: './modal-regras.component.html',
  styleUrls: ['./modal-regras.component.scss'],
})
export class ModalRegrasComponent implements OnInit {
  regras = [];
  onde;
  essa;
  arrayEssa = [];
  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => {
        let aux = node.data;
        aux.schemaregras = JSON.parse(aux.schemaregras);
        const data = {
          nome: aux.schemaregras.nome,
          idregra: aux.idregra,
          entrada: aux.schemaregras.entrada,
          saida: aux.schemaregras.saida,
        };
        this.setRegra(data);
      },
    },
  };
  options = {
    displayField: 'idregra',
    actionMapping: this.actionMapping,
  };
  constructor(
    private serviceRegras: RegrasService,
    private bsmodalService: BsModalService
  ) {}

  ngOnInit() {
    this.serviceRegras.getRegras().subscribe((regras: Array<any>) => {
      if (regras) {
        this.arrayEssa.push(this.essa);
        this.regras = [...regras];
      }
    });
  }
  setRegra(schemaregra) {
    this.onde.regra = schemaregra;
    this.bsmodalService.hide();
  }
}
