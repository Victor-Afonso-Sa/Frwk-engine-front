import { Component, OnInit } from '@angular/core';
import { EscopoClassComponent } from '../../EscopoClass.component';

@Component({
  selector: 'app-if',
  templateUrl: './if.component.html',
  styleUrls: ['../../styleEscopo.css', './if.component.scss'],
})
export class IfComponent extends EscopoClassComponent implements OnInit {
  hide = true;
  ngOnInit() {
    this.service.buttonHide.subscribe((d) => {
      if (d >= 0) {
        this.hide = true;
      }
    });
    setTimeout(() => {
      this.objetoLocal = {
        nome: `${this.tipo}${this.id}`,
        id: this.id,
        tipo: this.tipo,
        variaveisescopo: super.setTotVariaveis(),
        itens: [],
      };
      this.addOnitens(this.objetoLocal);
      if (!this.edicao) {
        this.createEscopo(`se`);
      }
    });
  }
  ngAfterViewInit() {
    if (this.edicao) {
      setTimeout(() => {
        this.objetoLocal = this.objeto;
        this.objeto = this.objEdit;
        for (const aux of this.objetoLocal['itens']) {
          if (aux.tipo) {
            if (aux.tipo == `senao`) {
              this.hide = false;
            }
            this.service.showEscopo(
              aux.tipo,
              `combo${aux.tipo}${this.id}`,
              aux,
              this.objetoLocal
            );
          }
        }
      });
    }
  }
  createEscopo(tipo) {
    const obj = Object.assign({}, this.objetoLocal);
    obj[`variaveis`] = this.setTotVariaveis();
    this.service.showEscopo(tipo, `combo${tipo}${this.id}`, obj);
  }
  destroy() {
    this.hide = false;
  }
}
