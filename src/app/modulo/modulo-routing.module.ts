import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeGuard } from '../guards/change.guard';
import { ModuloComponent } from './modulo/modulo.component';

const routes: Routes = [
  {path: '', component: ModuloComponent},
  {path: ':pasta', component: ModuloComponent},
  {path: ':pasta/:edit', component: ModuloComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloRoutingModule { }
