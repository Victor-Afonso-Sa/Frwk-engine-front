import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCreatePastasComponent } from './modal-create-pastas/modal-create-pastas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalRegraOptionComponent } from './modal-regra-option/modal-regra-option.component';
import { ModalNewVarComponent } from './modal-new-var/modal-new-var.component';
import { AutosizeDirective } from '../autosize.directive';
import { ExpressaoComponent } from './modal-new-var/expressao/expressao.component';
import { ModalVariaveisComponent } from './modal-variaveis/modal-variaveis.component';
import { ModalExpressaoComponent } from './modalExpressao/modalExpressao.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { TiposModule } from '../tipos/tipos/tipos.module';
import { ModalRegrasComponent } from './modal-regras/modal-regras.component';
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
    TestRegraComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TreeModule,TiposModule],
  exports:[ExpressaoComponent],
  providers: [],
})
export class ModalsModule {}
