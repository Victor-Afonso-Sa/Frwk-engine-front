import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpressaoService {
  @Output() expressao = new EventEmitter();
constructor() { }

}
