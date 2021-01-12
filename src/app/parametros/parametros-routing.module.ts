import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametrosFormComponent } from './parametros-form/parametros-form.component';
import { ParametrosSidebarComponent } from './parametros-sidebar/parametros-sidebar.component';

const routes: Routes = [
  { path: '', component: ParametrosSidebarComponent },
  { path: 'form/:pasta', component: ParametrosFormComponent, outlet: `dash` },
  {
    path: 'form/:pasta/:edit',
    component: ParametrosFormComponent,
    outlet: `dash`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrosRoutingModule {}
