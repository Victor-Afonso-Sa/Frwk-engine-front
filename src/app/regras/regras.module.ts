import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegrasRoutingModule } from './regras-routing.module';
import { DynamicComponentComponent } from './create-regra/dynamic-component/dynamic-component.component';
import { CreateRegraComponent } from './create-regra/create-regra.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegrasSidebarComponent } from './regras-sidebar/regras-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCreateRegraComponent } from './form-create-regra/form-create-regra.component';
import { AtribuicaoComponent } from './create-regra/atribuicao/atribuicao.component';
import { RetornarComponent } from './create-regra/retornar/retornar.component';
import { BreakComponent } from './create-regra/break/break.component';
import { IfComponent } from './create-regra/if/if/if.component';
import { CondicaoComponent } from './create-regra/if/condicao.component';
import { EnquantoComponent } from './create-regra/enquanto/enquanto.component';
import { IteracaoComponent } from './create-regra/iteracao/iteracao.component';
import { TiposComponent } from '../tipos/tipos/tipos.component';
import { TiposModule } from '../tipos/tipos/tipos.module';
import { ExecutarRegraComponent } from './create-regra/executar-regra/executar-regra.component';
import { CreateVariavelComponent } from './create-regra/create-variavel/create-variavel.component';
import { ManipulacaoArrayComponent } from './create-regra/manipulacao-array/manipulacao-array.component';
import { VerificacaoVarModule } from './verificacao-var/verificacao-var.module';

@NgModule({
  declarations: [
    DynamicComponentComponent,
    CreateRegraComponent,
    RegrasSidebarComponent,
    FormCreateRegraComponent,
    AtribuicaoComponent,
    IfComponent,
    CondicaoComponent,
    RetornarComponent,
    BreakComponent,
    EnquantoComponent,
    IteracaoComponent,
    ExecutarRegraComponent,
    CreateVariavelComponent,
    ManipulacaoArrayComponent
  ],
  imports: [
    CommonModule,
    RegrasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TiposModule,
    VerificacaoVarModule
  ],
  entryComponents: [
    DynamicComponentComponent,
    IteracaoComponent,
    RetornarComponent,
    EnquantoComponent,
    AtribuicaoComponent,
    IfComponent,
    BreakComponent,
    ExecutarRegraComponent,
    ManipulacaoArrayComponent
  ],
})
export class RegrasModule {}
