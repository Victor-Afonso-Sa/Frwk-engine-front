import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'model' },
  {
    path: 'model',
    loadChildren: () =>
      import('./model/model.module').then((m) => m.ModelModule),
  },
  {
    path: 'regras',
    loadChildren: () =>
      import('./regras/regras.module').then((m) => m.RegrasModule),
  },
  {
    path: 'parametros',
    loadChildren: () =>
      import('./parametros/parametros.module').then((m) => m.ParametrosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
