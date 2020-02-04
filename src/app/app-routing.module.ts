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
import { QuestMakerComponent } from './quest-maker/quest-maker.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "quest", component: ViewQuestComponent},
  {path: "quest/:id",component: SingleQuestComponent},
  {path: "campaign", component: CampaignMapComponent},
  {path: "campaign/:id",component: CampaignComponent},
  {path: "create", component: CreateComponent},

  {path: "profile", component: ProfileComponent},
  {path: "leaderboard", component: LeaderboardComponent},
  
  {path: "qr", component: CuriousUserComponent},
  {path: "qr/:random",component: CuriousUserComponent},
  {path: "about", component: CuriousUserComponent},
  {path: "tutorial", component: How2playComponent},
  {path: "questmaker", component: QuestMakerComponent},
  {path: "MainMenu", component: MainMenuComponent},
  {path: "", pathMatch: "full", redirectTo:"login"},
  {path: "**", redirectTo: "login"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
