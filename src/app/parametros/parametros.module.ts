import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalsModule } from '../modals/modals.module';
import { TiposModule } from '../tipos/tipos/tipos.module';
import { ParametrosFormComponent } from './parametros-form/parametros-form.component';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { ParametrosSidebarComponent } from './parametros-sidebar/parametros-sidebar.component';

@NgModule({
  declarations: [ParametrosSidebarComponent, ParametrosFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ParametrosRoutingModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TiposModule,
    ModalsModule,
  ],
})
export class ParametrosModule {}
