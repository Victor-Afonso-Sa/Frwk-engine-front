import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AutosizeDirective } from '../autosize.directive';
import { ExpressaoComponent } from '../expressao/expressao.component';
import { TiposModule } from '../tipos/tipos/tipos.module';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalCreatePastasComponent } from './modal-create-pastas/modal-create-pastas.component';
import { ModalNewVarComponent } from './modal-new-var/modal-new-var.component';
import { ModalRegraOptionComponent } from './modal-regra-option/modal-regra-option.component';
import { ModalRegrasComponent } from './modal-regras/modal-regras.component';
import { ModalVariaveisComponent } from './modal-variaveis/modal-variaveis.component';
import { ModalExpressaoComponent } from './modalExpressao/modalExpressao.component';
import { ModalTrilhaComponent } from './modalTrilha/modalTrilha.component';
import { TrilhaModule } from './modalTrilha/trilha/trilha.module';
import { TestRegraComponent } from './test-regra/test-regra.component';

@NgModule({
  declarations: [
    ModalCreatePastasComponent,
    ModalRegraOptionComponent,
    ModalNewVarComponent,
    AutosizeDirective,
    ExpressaoComponent,
    ModalVariaveisComponent,
    ModalExpressaoComponent,
    ModalRegrasComponent,
    ModalAlertComponent,
    TestRegraComponent,
    ModalTrilhaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    TiposModule,
    TooltipModule.forRoot(),
    TrilhaModule,
  ],
  exports: [ExpressaoComponent],
  providers: [],
})
export class ModalsModule {}
