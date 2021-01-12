import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllpageTrilhaComponent } from "./AllpageTrilha/AllpageTrilha.component";


const routes: Routes = [
  { path: 'executado/:idtrilha' , component: AllpageTrilhaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrilhaModuleRouting { }
