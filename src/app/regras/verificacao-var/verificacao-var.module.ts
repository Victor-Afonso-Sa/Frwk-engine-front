import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificacaoVarComponent } from './verificacao-var.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [VerificacaoVarComponent],
  exports:[VerificacaoVarComponent]
})
export class VerificacaoVarModule { }
