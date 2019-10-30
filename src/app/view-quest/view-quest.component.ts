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

  ngOnInit() {
    this.FetchQuest();
  }

  openPage(id){
    
    console.log(`open page for questId: ${id}`);
    this.router.navigate([`/ViewQuest/${id}`])
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
}
