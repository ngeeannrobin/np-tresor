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

  id: string;
  nextable: boolean = false;

  state: string;
  campaign: any;
  textindex: number = -1;
  displayText: string = "";
  showImage: boolean = false;
  showCampaign: boolean = false;

  questKeys: Array<string>;

  evenQuestKeys: Array<string>;
  oddQuestKeys: Array<string>;

  currentQuestId: string;
  currentQuest: any;
  questStoryOver: boolean = false;

  userId: string;
  userName: string;
  isGuest: boolean = false;

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
        this.userId = this.auth.GetUserId();
        this.userName = this.auth.GetUserDisplayName();
      } else {
        //this.router.navigate(["login"]);
        // enable guest mode
        this.userName = `Hunter #${Math.floor(Math.random()*9000 + 1000)}`;
        this.isGuest = true;
      }
      this.id = this.route.snapshot.paramMap.get("id");
      this.FetchCampaign(this.id);
    })
  }

  FetchCampaign(id:string): void{
    this.gameservice.FetchSingleCampaign(id,this.userId,this.isGuest).then(campaign => {
      this.campaign = campaign;
      this.questKeys = this.GetQuestKeys(campaign.quest,campaign.startQuest);

      if (this.questKeys.length % 2 != 0) {
        this.evenQuestKeys = this.questKeys.filter((_, index) => index % 2 == 0)
        this.oddQuestKeys = this.questKeys.filter((_, index) => index % 2 != 0)
      } else {
        this.evenQuestKeys = this.questKeys.filter((_, index) => index % 2 != 0)
        this.oddQuestKeys = this.questKeys.filter((_, index) => index % 2 == 0)
      }

      // set current quest to the first quest that is not done
      this.currentQuestId = campaign.startQuest;

      while (this.campaign.quest[this.currentQuestId].done){
        this.currentQuestId = campaign.quest[this.currentQuestId].nextQuest;
      }

      this.state = "backstory";
      this.Next();
    },
    err => {
      console.log(err);
    })
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
          this.state = ((this.campaign.introText) && (this.currentQuestId==this.campaign.startQuest))?"intro":"quests";
          this.showCampaign = true;
          if (this.state == "quests")
            this.dISPLAYtEXT("Your progress was saved when you left.");
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
          this.Next();
        }
        break;
      
      case "quests":
        this.scrollTo(this.campaign.quest[this.currentQuestId].nextQuest || this.currentQuestId);
        // check if current quest has a story
        if (this.campaign.quest[this.currentQuestId].questStory){
          if (this.textindex < this.campaign.quest[this.currentQuestId].questStory.length-1){
            this.questStoryOver = false;
            this.textindex++;
            this.dISPLAYtEXT(this.campaign.quest[this.currentQuestId].questStory[this.textindex]);
          } else {
            this.questStoryOver = true;
            if (this.currentQuestId === this.campaign.startQuest)
              this.scrollTo(this.currentQuestId,true);
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

  async dISPLAYtEXT(data){

    this.nextable = false;

    if (!data.img){
      let text:string = data;
      text = text.replace("{{username}}",this.userName);
      this.showImage = false;
      for (let i=0; i<=text.length; i-=-1){
        this.displayText = text.slice(0,i);
        await this.sleep(10);
      }
    } else { // display image
      this.showImage = true;
      this.displayText = data.base64;
    }


    this.nextable = true;
  }

  async sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  eventReceiver(data): void{
    if (data.key == "solved"){
      this.completeQuest();
    } else if (data.key == "save"){
      if (!this.isGuest){
        this.gameservice.SaveCampaignData(this.id, this.userId, data.data);
      }
    } else if (data.key == "back") {
      this.currentQuest = null;
    }
  }

  completeQuest(): void {
    
    // update local data
    this.currentQuest.done = true;
    this.currentQuestId = this.currentQuest.nextQuest;
    this.campaign.questCompleted++;


    // update cloud data
    if (!this.isGuest){
      this.gameservice.CompleteQuestCampaign(this.id, this.userId, this.campaign  );
    }
    



    // clear currentQuest to show campaign line
    this.currentQuest = null;
    
    // if last quest is completed
    if (this.currentQuestId == null)
      this.state = "completed";

    // display story if any
    this.Next();
  }


  scrollTo(id: string, atBottom: boolean = false): void {
    let el: Element = document.getElementById(id);
    if (atBottom)
      el.scrollIntoView({behavior:"smooth",block: "end"});
    else
      el.scrollIntoView({behavior:"smooth"});
    
  }

  back(){
    this.location.back();
  }

}
