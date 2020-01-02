import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  nextable: boolean = false;

  state: string;
  campaign: any;
  textindex: number = -1;
  displayText: string = "";
  showCampaign: boolean = false;

  questKeys: Array<string>;

  currentQuestId: string;
  currentQuest: any;
  questStoryOver: boolean = false;

  constructor(
    private gameservice: GameService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    


    this.auth.CheckLogin().then(loggedIn => {
      if (loggedIn){
        this.FetchCampaign(this.route.snapshot.paramMap.get("id"));
      } else {
        this.router.navigate(["login"]);
      }
    })
  }

  FetchCampaign(id:string): void{
    this.gameservice.FetchSingleCampaign(id).then(
      campaign => {
        this.campaign = campaign;
        this.questKeys = this.GetQuestKeys(campaign.quest,campaign.startQuest);

        this.questKeys.forEach(quest=>{
          this.campaign.quest[quest].done = false;
        })

        this.state = "backstory";
        this.Next();
      },
      err => {
        console.log(err);
      }
    )
  }

  // returns an array of questIds in reverse order
  GetQuestKeys(questObj:any,startQuest:string): Array<string>{
    let currentQuestId = startQuest;
    let questkeys = [];
    while (currentQuestId!=null){
      questkeys.unshift(currentQuestId);
      currentQuestId = questObj[currentQuestId].nextQuest;
    }

    return questkeys

  }

  Next(){
    switch(this.state){
      case "backstory":
        if (this.textindex < this.campaign.backStory.length-1){
          this.textindex++;
          this.dISPLAYtEXT(this.campaign.backStory[this.textindex]);
        } else {
          this.textindex = -1;
          this.state = this.campaign.introText?"intro":"quests";
          this.showCampaign = true;
          this.Next();
        }
        break;
      case "intro":
        if (this.textindex < this.campaign.introText.length-1){
          this.textindex++;  
          this.dISPLAYtEXT(this.campaign.introText[this.textindex]);
        } else {
          this.textindex = -1;
          this.state = "quests";
          this.scrollTo(this.campaign.startQuest);
          this.Next();
        }
        break;
      
      case "quests":
        if (!this.currentQuestId){
          this.currentQuestId = this.campaign.startQuest;
        }
        this.scrollTo(this.currentQuestId);
        // check if current quest has a story
        if (this.campaign.quest[this.currentQuestId].questStory){
          if (this.textindex < this.campaign.quest[this.currentQuestId].questStory.length-1){
            this.questStoryOver = false;
            this.textindex++;
            this.dISPLAYtEXT(this.campaign.quest[this.currentQuestId].questStory[this.textindex]);
          } else {
            this.questStoryOver = true;
            this.nextable = false;
            this.textindex = -1;
          }
        } else {
          this.questStoryOver = true;
          this.nextable = false;
          this.textindex = -1;
        }

        break;
      case "completed":
        if (this.textindex < this.campaign.endText.length-1){

          this.textindex++;
          this.dISPLAYtEXT(this.campaign.endText[this.textindex]);
        } else {
          this.back();
          // redirect
        }
        
        break;
      default:
        break;
    }
    
  }

  SelectQuest(questId:string):void {
    if (questId==this.currentQuestId){
      this.currentQuest = this.campaign.quest[questId];
    } 
  }

  async dISPLAYtEXT(text:string){

    this.nextable = false;

    for (let i=0; i<=text.length; i-=-1){
      this.displayText = text.slice(0,i);
      await this.sleep(10);
    }

    this.nextable = true;
  }

  async sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  eventReceiver(data): void{
    if (data.key == "solved"){
      this.nextQuest();
      console.log("solved")
    }
  }

  nextQuest(): void {
    this.currentQuest.done = true;
    this.currentQuestId = this.currentQuest.nextQuest;
    this.currentQuest = null;
    console.log(this.currentQuestId);
    if (this.currentQuestId == null){
      this.state = "completed";
      
    }
    this.Next();
  }


  scrollTo(id: string): void {
    let el: Element = document.getElementById(id);
    el.scrollIntoView({behavior:"smooth"});
    
  }

  back(){
    this.location.back();
  }

}
