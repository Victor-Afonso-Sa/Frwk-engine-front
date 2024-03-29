import { Component, Input, OnInit } from '@angular/core';
import { IActionMapping } from '@circlon/angular-tree-component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewVarService } from '../modal-new-var/new-var.service';

@Component({
  selector: 'app-modal-variaveis',
  templateUrl: './modal-variaveis.component.html',
  styleUrls: ['./modal-variaveis.component.scss'],
})
export class ModalVariaveisComponent implements OnInit {
  constructor(
    private varService: NewVarService,
    private service: BsModalService,
  ) {}
  @Input() variaveis: Array<any>;
  @Input() only;
  error;
  parametros;
  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => {
        this.setVar(node.data);
      },
    },
  };
  options = {
    displayField: 'nome',
    actionMapping: this.actionMapping,
  };
  ngOnInit(): void {}
  setKeys(item) {
    if (Object.keys(item).length >= 0) {
      return true;
    } else {
      return false;
    }
  }
  tojson(value) {
    return JSON.parse(value);
  }
  setVar(value) {
    if (this.only) {
      if (value.type == this.only) {
        this.varService.variavel.emit(value);
        this.service.hide();
      } else {
        this.error = true;
      }
    } else {
      this.varService.variavel.emit(value);
      this.service.hide();
    }
  }
  hide() {
    this.varService.variavel.emit(null);
    this.service.hide();
  }
}
