import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { RoutingStateService } from '../routing-state.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-quest',
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.css']
})
export class ViewQuestComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private gameservice: GameService,
    private router: Router,
    private routingStateService: RoutingStateService,
    private location: Location
  ) { }
  
  displayProgressSpinner = true;
  
  Object = Object;
  quests: any = {
    done: [],
    notdone: []
  };
  tabs: Array<any> = [
    {text: "Not done",selected: false},
    {text: "All", selected: true},
    {text: "Done", selected: false},
  ];
  animate: number = 0; // -1 = left, +1 = right
  userId: string = "";

  ngOnInit() {
    this.auth.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.userId = this.auth.GetUserId();
        this.CheckTutorial();
        this.FetchQuest();
      } else {
        this.router.navigate(["login"]);
      }
    })
  }

  openNotDonePage(questId){
    this.router.navigate([`/quest/${questId}`])
  }

  openDonePage(questId){
    // this.router.navigate([`/leaderboard`])
  }


  async selectTab(selectedTab){
    if (!selectedTab.selected && this.animate==0){ // execute only when we are not animating
      this.tabs.forEach(tab => {
        tab.selected = false;
      });
      selectedTab.selected = true;

      const goLeft = this.tabs.indexOf(selectedTab)==2;

      this.animate = goLeft?-1:1;
      await this.delay(500);
      this.animate = 0;
      if (goLeft){
        let temp = this.tabs.shift();
        this.tabs.push(temp);
      } else {
        let temp = this.tabs.pop();
        this.tabs.unshift(temp);
      }
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // download quest table from firebase
  // TODO: Refactor this in the future
  // (player should only download relevant quests depending on gamemode)
  // Bin from 06Feb20: HAHA WHERE GOT TIME DO??
  FetchQuest(){
    this.gameservice.FetchQuest(this.userId).then(
      quest => {
        this.quests = quest;

      },err => {
        console.log(err);
      }
    )
  }

  CheckTutorial(){
    this.gameservice.FetchTutorialStatus(this.userId).then(
      tutDone => {
        if (!tutDone){
          this.router.navigate(["/tutorial"]);
        }
      }
    )
  }

  goBack() {
    // let url = this.routingStateService.getPreviousUrl();
    // this.router.navigate([url||'login']);
    this.location.back();
  }
}
