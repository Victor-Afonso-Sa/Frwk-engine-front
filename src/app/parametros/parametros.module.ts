import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { ParametrosSidebarComponent } from './parametros-sidebar/parametros-sidebar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ParametrosFormComponent } from './parametros-form/parametros-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiposModule } from '../tipos/tipos/tipos.module';
import { ModalsModule } from '../modals/modals.module';


@NgModule({
  declarations: [
    ParametrosSidebarComponent,
    ParametrosFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ParametrosRoutingModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TiposModule,
    ModalsModule,
  ]
})
export class ParametrosModule { }
