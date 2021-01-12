import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegrasResolver } from '../guards/RegrasResolver';
import { CreateRegraComponent } from './create-regra/create-regra.component';
import { FormCreateRegraComponent } from './form-create-regra/form-create-regra.component';
import { RegrasSidebarComponent } from './regras-sidebar/regras-sidebar.component';

const routes: Routes = [
  { path: '', component: RegrasSidebarComponent },
  { path: 'create', component: CreateRegraComponent },
  { path: 'edit/:id', component: CreateRegraComponent },
  { path: 'form/:pasta', component: FormCreateRegraComponent, outlet: 'dash' },
  {
    path: 'form/:pasta/:edit',
    component: FormCreateRegraComponent,
    outlet: 'dash',
    resolve: { regra: RegrasResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegrasRoutingModule {}
