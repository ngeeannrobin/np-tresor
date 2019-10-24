import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ARComponent } from './ar/ar.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';

const routes: Routes = [
  {path: "ar", component: ARComponent},
  {path: "ViewQuest", component: ViewQuestComponent},
  {path: "", pathMatch: "full", redirectTo:"ViewQuest"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
