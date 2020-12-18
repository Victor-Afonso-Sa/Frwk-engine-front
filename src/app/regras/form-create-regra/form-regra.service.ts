import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormRegraService {
editJson;
index;
constructor() { }

setEditJson(json, index){
  this.editJson = json;
  this.index = index;
}
getEditJson(){
  return this.editJson;
}
getIndex(){
  return this.index;
}
}
