import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { RegrasService } from '../../regras.service';

@Component({
  selector: 'app-create-variavel',
  templateUrl: './create-variavel.component.html',
  styleUrls: ['./create-variavel.component.scss'],
})
export class CreateVariavelComponent implements OnInit, OnChanges {
  erros = [];
  @Input() objetoLocal;
  varControler =
    // new FormControl(null);
    {
      setErrors: (erro) => {
        this.varControler.errors.push(erro);
      },
      errors: [],
    };
  constructor(
    private modals: ModalsServicesService,
    private service: RegrasService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['objetoLocal']) {
      this.verificarModelo();
    }
  }
  newVar() {
    this.modals.createVar(this.objetoLocal);
  }
  editVar(item) {
    this.modals.createVar(this.objetoLocal, item, this.varControler);
  }
  verificarModelo() {
    if (this.objetoLocal[`variaveisLocal`]) {
      for (
        let index = 0;
        index < this.objetoLocal[`variaveisLocal`].length;
        index++
      ) {
        const obj = this.objetoLocal[`variaveisLocal`][index];
        this.service.verificarModelos(obj, this.varControler);
      }
    }
  }
}
