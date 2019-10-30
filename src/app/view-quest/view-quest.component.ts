import { Component, OnInit } from '@angular/core';
import { RealtimedatabaseService } from '../realtimedatabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-quest',
  templateUrl: './view-quest.component.html',
  styleUrls: ['./view-quest.component.css']
})
export class ViewQuestComponent implements OnInit {

  constructor(
    private dbService: RealtimedatabaseService,
    private router: Router
  ) { }
  
  
  Object = Object;
  quests: any = {};
  tabs: Array<any> = [
    {text: "Not done",selected: false},
    {text: "All", selected: true},
    {text: "Done", selected: false},
  ];
  animate: number = 0; // -1 = left, +1 = right

  ngOnInit() {
    this.FetchQuest();
  }

  openPage(id){
    console.log(`open page for questId: ${id}`);
    this.router.navigate([`/ViewQuest/${id}`])
  }

  async selectTab(selectedTab){
    if (!selectedTab.selected && this.animate==0){ // execute only when we are not animating
      this.tabs.forEach(tab => {
        tab.selected = false;
      });
      selectedTab.selected = true;

      const goLeft = this.tabs.indexOf(selectedTab)==2;

      this.animate = goLeft?-1:1;
      console.log(goLeft);
      await this.delay(1000);
      this.animate = 0;
      if (goLeft){
        // let temp = this.tabs.
        let temp = this.tabs.shift();
        this.tabs.push(temp);
      } else {
        let temp = this.tabs.pop();
        this.tabs.unshift(temp);
      }
    }


  }

  // download quest table from firebase
  // TODO: Refactor this in the future
  // (player should only download relevant quests depending on gamemode)
  FetchQuest(){
    this.dbService.FetchQuest().then(
      quest => {
        this.quests = quest;
      },
      err => {
        console.log(err);
      }
    )
  }

  RandInt(start,end){
    return Math.floor(Math.random() * (end-start) + start);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
