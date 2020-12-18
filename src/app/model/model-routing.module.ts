import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from '../modulo/modulo/modulo.component';

import { ModelComponent } from './model/model.component';

const routes: Routes = [
  { path: '' , component: ModelComponent},
  {path: 'modulo', loadChildren: () => import('../modulo/modulo.module').then(m => m.ModuloModule),outlet:'dash'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
