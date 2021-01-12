import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloRoutingModule } from './modulo-routing.module';
import { ModuloComponent } from './modulo/modulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [ModuloComponent],
  imports: [
    CommonModule,
    ModuloRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
  exports: [ModuloComponent],
})
export class ModuloModule {}
