import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposComponent } from './tipos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TiposComponent],
  exports:[TiposComponent],
})
export class TiposModule { }
