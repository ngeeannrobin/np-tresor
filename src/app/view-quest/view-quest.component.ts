import { Component, OnInit } from '@angular/core';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { Router } from '@angular/router';
import { GameService } from '../game.service';


@Component({
  selector: 'app-view-quest',
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.css']
})
export class ViewQuestComponent implements OnInit {

  constructor(
    private gameservice: GameService,
    private router: Router
  ) { }
  
  
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

  ngOnInit() {
    this.FetchQuest();
  }

  openNotDonePage(questId){
    this.router.navigate([`/ViewQuest/${questId}`])
  }

  openDonePage(questId){
    console.log(questId);
  }


  async selectTab(selectedTab){
    if (!selectedTab.selected && this.animate==0){ // execute only when we are not animating
      this.tabs.forEach(tab => {
        tab.selected = false;
      });
      selectedTab.selected = true;

      const goLeft = this.tabs.indexOf(selectedTab)==2;

      this.animate = goLeft?-1:1;
      await this.delay(1000);
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
  FetchQuest(){
    // hardcoded uuid
    this.gameservice.FetchQuest("rfzsuKftCNYb3GtednLrRFtr6Uu2").then(
      quest => {
        // randomly set ~80% of quests to notdone, the rest is done
        // Object.keys(quest).forEach(questId => {
        //   if (Math.random() > 0.2)
        //     this.quests.notdone[questId] = quest[questId];
        //   else
        //     this.quests.done[questId] = quest[questId];
        // })
        this.quests = quest;

      },err => {
        console.log(err);
      }
    )
  }
}
