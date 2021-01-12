import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { VerificacaoVarComponent } from './verificacao-var.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [VerificacaoVarComponent],
  exports: [VerificacaoVarComponent],
})
export class VerificacaoVarModule {}
