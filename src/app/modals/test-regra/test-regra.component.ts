import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-test-regra',
  templateUrl: './test-regra.component.html',
  styleUrls: ['./test-regra.component.scss'],
})
export class TestRegraComponent implements OnInit {
  @Input() idregra;
  @Input() entradaVar;
  retorno;
  errorControl;
  click = false;
  entrada = new FormControl(null, [Validators.required]);
  constructor(
    private shared: SharedService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {}
  testar() {
    this.click = true;
    try {
      this.shared.executeTest(this.idregra, this.entrada.value).subscribe(
        (v) => (this.retorno = JSON.stringify(v)),
        (error) => {
          if (error.status == 400) {
            this.errorControl =
              'Insira um valor valido na entrada (' + error.error.message + ')';
          } else {
            this.errorControl = error.error.message;
          }
        }
      );
    } catch (error) {
      this.errorControl = error;
    }
  }
  hide() {
    this.bsModalService.hide();
  }
  async exemploEntrada() {
    if (this.entradaVar.type == `modelo` && this.entradaVar.modelo) {
      this.entrada.setValue(
        JSON.stringify(await this.shared.jsonGenerate(this.entradaVar.modelo))
      );
    } else if (this.entradaVar.type == `array` && this.entradaVar.tipoitems) {
      this.entrada.setValue(
        JSON.stringify(
          await this.shared.jsonGenerate({
            type: `array`,
            items: {
              type:
                this.entradaVar.tipoitems == `modelo`
                  ? this.entradaVar.tipomodelo
                  : this.entradaVar.tipoitems,
            },
          })
        )
      );
    } else {
      this.entrada.setValue(
        JSON.stringify(
          await this.shared.jsonGenerate({ type: this.entradaVar.type })
        )
      );
    }
  }
}
