import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './model/model.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [ModelComponent],
  imports: [
    CommonModule,
    ModelRoutingModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ModelComponent]
})
export class ModelModule { }
