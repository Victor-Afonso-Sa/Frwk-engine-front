import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrilhaComponent } from './trilha.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AllpageTrilhaComponent } from './AllpageTrilha/AllpageTrilha.component';
import { TrilhaModuleRouting } from './trilha.module.routing';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TrilhaModuleRouting,
  ],
  declarations: [TrilhaComponent, AllpageTrilhaComponent],
  exports: [TrilhaComponent]
})
export class TrilhaModule { }
