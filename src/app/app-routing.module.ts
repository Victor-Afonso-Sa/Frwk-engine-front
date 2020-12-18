import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeGuard } from './guards/change.guard';
import { AutosizeDirective } from './autosize.directive';

const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'model'},
{path: 'model', loadChildren: () => import('./model/model.module').then(m => m.ModelModule)},
{path: 'regras', loadChildren: () => import('./regras/regras.module').then(m => m.RegrasModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
