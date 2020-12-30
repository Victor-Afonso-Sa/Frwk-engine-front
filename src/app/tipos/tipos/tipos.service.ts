import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

constructor() { }
verificaType(formulario, obj){
  let verificador = true;
    if (
      formulario.valid &&
      obj[`type`]

    ) {
      switch (obj[`type`]) {
        case `array`:
          if (obj[`tipoitems`]) {
            verificador = false;
            if (obj[`tipoitems`] == `modelo`) {
              if (!(`tipomodelo` in obj)) {
                verificador = true;
              }
            }
          }
          break;
        case `modelo`:
          if (obj[`tipomodelo`]) {
            verificador = false;
          } else {
            verificador = true;
          }
        case `string`:
        case `boolean`:
        case `integer`:
          verificador = false;
          break;
        default:
          verificador = true;
          break;
      }
    }
    return verificador;
}
}
