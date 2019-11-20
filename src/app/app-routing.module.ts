import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';
import { CuriousUserComponent } from './curious-user/curious-user.component';
import { ProgressSpinnerDemoComponent } from './progress-spinner-demo/progress-spinner-demo.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "ViewQuest", component: ViewQuestComponent},
  {path: "ViewQuest/:id",component: SingleQuestComponent},
  {path: "qr/:random",component: CuriousUserComponent},
  {path: "", pathMatch: "full", redirectTo:"login"},
  {path: "test", component: ProgressSpinnerDemoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
