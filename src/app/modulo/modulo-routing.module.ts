import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuloComponent } from './modulo/modulo.component';

const routes: Routes = [
  { path: '', component: ModuloComponent },
  { path: ':pasta', component: ModuloComponent },
  { path: ':pasta/:edit', component: ModuloComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloRoutingModule {}
