import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  @Output() responseConfirm = new EventEmitter();
constructor() { }

}
