import { Component, OnInit } from '@angular/core';
import { QuestMakerService } from '../quest-maker.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quest-maker',
  templateUrl: './quest-maker.component.html',
  styleUrls: ['./quest-maker.component.css']
})
export class QuestMakerComponent implements OnInit {

  constructor(
    private questMaker: QuestMakerService,private auth: AuthService) { }

  ngOnInit() {
    this.auth.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.questMaker.CreateQuest(this.auth.GetUserId(),{questId:"test",title:"test",hint: []}).then(_=>{
          console.log("test");
        })
      }
    })

  }

}
