import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
@Output() escolha = new EventEmitter();
constructor() { }
}
