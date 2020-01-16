import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewQuestComponent } from './view-quest/view-quest.component';
import { SingleQuestComponent } from './single-quest/single-quest.component';
import { CuriousUserComponent } from './curious-user/curious-user.component';
import { ProfileComponent } from './profile/profile.component';
import { How2playComponent } from './how2play/how2play.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignMapComponent } from './campaign-map/campaign-map.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "ViewQuest", component: ViewQuestComponent},
  {path: "ViewQuest/:id",component: SingleQuestComponent},
  {path: "Campaign/:id",component: CampaignComponent},
  {path: "leaderboard", component: LeaderboardComponent},
  {path: "qr", component: CuriousUserComponent},
  {path: "qr/:random",component: CuriousUserComponent},
  {path: "about", component: CuriousUserComponent},
  {path: "tutorial", component: How2playComponent},
  {path: "campaign", component: CampaignMapComponent},
  {path: "", pathMatch: "full", redirectTo:"login"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
