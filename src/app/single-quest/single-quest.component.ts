import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'quest-qr',
  templateUrl: './single-quest.component.html',
  styleUrls: ['./single-quest.component.css'],
})
export class SingleQuestComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private gameservice: GameService,
    private location: Location,
    private router: Router) { }

  loaded: boolean = false;
  questId: string;
  quest: any = {hint:{}};
  savedData: any;
  showCamera: boolean = false;
  showHint: boolean = true;
  object = Object;
  animate: number = 0; // -1 if closing camera, 1 if opening camera
  correct: boolean = undefined;
  showMessage: boolean = false;
  message: string = "";
  loadingHint: boolean = false;
  userId: string = "";
  awarding: boolean = false;

  ngOnInit() {
    this.auth.CheckLogin().then(loggedIn => {
      if (loggedIn){
          this.userId = this.auth.GetUserId();
          this.questId = this.route.snapshot.paramMap.get("id");
          this.FetchQuest(this.questId);
      }
    })
  }

  FetchQuest(id){
    this.gameservice.FetchSingleQuest(id,this.userId).then(
      quest => {
        this.quest = quest;
      },
      err => {
        console.log(err);
      }
    )
  }

  TakeHint(){
    // disable camera if camera is showing
    if (this.showCamera){
      this.ToggleCamera();
    }
    if (this.quest.hintTakenCount < this.quest.hint.length && !this.loadingHint){
        this.loadingHint = true;
        this.gameservice.TakeHint(this.quest,this.userId).then(
          _ => {
            this.quest.point -= this.quest.hint[this.quest.hintTakenCount].point
            this.quest.hintTakenCount += 1;
            this.quest.hintAvailCount -= 1;
            this.loadingHint = false;
          },
          err=>{
            this.loadingHint = false;
            alert(err);
          }
        )
    }
  }


  async ToggleCamera(){
    if (this.animate==0){ //no animation playing
      if (this.showCamera){ // camera is open / hint is not showing
        this.animate = -1;
        this.showHint = true;
        await this.delay(500);
        this.showCamera = false;
      } else { // camera not open / hint is showing
        this.showCamera = true;
        this.animate = 1;
        await this.delay(500);
        this.showHint = false;
      }
      this.animate = 0;
    }
  }

  ScanCallback(qr_data){
    this.ToggleCamera();
    if (this.CheckQR(qr_data)){
      this.message = "You got it! Tap anywhere to return back to quests!"
      if (!this.awarding){
        this.awarding = true;
          this.gameservice.CompleteQuest(this.quest, this.userId).then(_=>{
            this.correct=true;
          })
      }
    } else {
      this.message = "That's ain't it, chief! Tap anywhere to continue."
      this.correct = false;
    }
  }

  CheckQR(qr_data):boolean{
    return qr_data == this.quest.qr;
  }

  back(){
    this.location.back();
  }

  async dismiss(){
    if (this.animate == 0){ // don't think need to check, but just in case
      if (this.correct){
          this.back();
      } else { // re-display hints and stuff
        this.animate = -1;
        this.showMessage = true;
        this.correct = undefined;
        await this.delay(500);
        this.showMessage = false;
        this.animate = 0;
      }
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, 0));
  }


}