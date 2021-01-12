import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './modelos-sidebar/modelo-sidebar.component';

@NgModule({
  declarations: [ModelComponent],
  imports: [
    CommonModule,
    ModelRoutingModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ModelComponent],
})
export class ModelModule {}
