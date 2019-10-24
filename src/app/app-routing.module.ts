import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewQuestComponent } from './view-quest/view-quest.component';

const routes: Routes = [
  {path: "ViewQuest", component: ViewQuestComponent},
  {path: "", pathMatch: "full", redirectTo:"ViewQuest"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
