import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalsModule } from './modals/modals.module';
import { ModuloModule } from './modulo/modulo.module';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from './model/model.module';
import { DynamicComponentComponent } from './regras/create-regra/dynamic-component/dynamic-component.component';
import { RegrasModule } from './regras/regras.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeDirective } from './autosize.directive';
import { TiposComponent } from './tipos/tipos/tipos.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ModalsModule,
    ModuloModule,
    ModelModule,
    HttpClientModule,
    RegrasModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
