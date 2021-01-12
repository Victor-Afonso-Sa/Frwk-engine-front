import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
})
export class TiposComponent implements OnInit {
  @Input() title = '';
  @Input() objeto = { type: '' };
  @Input() formulario;
  @Input() pastas;
  @Output() setArrayEmitter = new EventEmitter();
  @Output() setModeloEmitter = new EventEmitter();
  @Output() setTypeEmitter = new EventEmitter();
  tiposVar = [
    { label: `Numérico`, tipo: `integer` },
    { label: `Caracteres`, tipo: `string` },
    { label: `Verdadeiro / Falso`, tipo: `boolean` },
    { label: `Modelo`, tipo: `modelo` },
  ];
  controler = true;
  constructor() {}

  ngOnInit(): void {}

  setArray(value) {
    this.setArrayEmitter.emit(value);
  }
  setModelo(value) {
    this.setModeloEmitter.emit(value);
  }
  setType(value) {
    this.setTypeEmitter.emit(value);
  }
}
