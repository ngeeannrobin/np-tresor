import { Component, OnInit } from '@angular/core';
import { GameorganiserService } from '../gameorganiser.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'newcampaign',
  templateUrl: './newcampaign.component.html',
  styleUrls: ['./newcampaign.component.css']
})
export class NewcampaignComponent implements OnInit {
  campaign = {
    quest: {},
    title: "",
    backStory: [],
    introText: [],
    endText: [],
    startQuest: null,
    endQuest: null
  };
  campaignId = "";
  GetKeys = Object.keys;
  quests = [{},{},{}  ];
  constructor(
    private auth: AuthService,
    private go: GameorganiserService) { }

  

  ngOnInit() {
  }

  CreateCampaign(){
    
    console.log(this.campaignId);
    console.log(this.campaign);
    //this.go.CreateCampaign(this.campaignId, this.campaign)
  }

}
