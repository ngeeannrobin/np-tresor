import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "ViewQuest", component: ViewQuestComponent},
  {path: "ViewQuest/:id",component: SingleQuestComponent},
  {path: "", pathMatch: "full", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
