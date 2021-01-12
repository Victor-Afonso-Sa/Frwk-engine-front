import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './modelos-sidebar/modelo-sidebar.component';


const routes: Routes = [
  { path: '', component: ModelComponent },
  {
    path: 'modulo',
    loadChildren: () =>
      import('../modulo/modulo.module').then((m) => m.ModuloModule),
    outlet: 'dash',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelRoutingModule {}
