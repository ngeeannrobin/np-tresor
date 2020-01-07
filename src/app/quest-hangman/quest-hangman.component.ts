import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'quest-hangman',
  templateUrl: './quest-hangman.component.html',
  styleUrls: ['./quest-hangman.component.css']
})
export class QuestHangmanComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  @Input() savedData: any;

  displayText: Array<string>;
  alphabets: Array<string> = 
    ['A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  alphabetsRevealed: string = " ";


  constructor() { }

  ngOnInit() {
    this.InjectData(this.savedData);

    this.alphabetsRevealed += this.quest.questData.given || "";
    

    this.quest.questData.answer = this.quest.questData.answer.toUpperCase();
    this.alphabetsRevealed.toUpperCase();
    this.constructDisplayText();
  }

  InjectData(data:any){
    this.alphabetsRevealed += this.savedData.alphabetsUsed || "";
  }
  
  constructDisplayText() {
    this.displayText = [];
    for (let i=0; i<this.quest.questData.answer.length; i-=-1){
      let c = this.quest.questData.answer[i];
      if (this.alphabetsRevealed.indexOf(c)!=-1){
        this.displayText.push(c);
      } else {
        this.displayText.push("_");
      }
    }
  }

  reveal(c){
    if (this.alphabetsRevealed.indexOf(c) == -1){
      this.alphabetsRevealed+=c;
      this.savedData.alphabetsUsed = (this.savedData.alphabetsUsed || "") + c;

      const dataEmitted:any = {key:"save"};
      dataEmitted.data = {alphabetsUsed: this.savedData.alphabetsUsed};
      this.emit(dataEmitted)

      this.constructDisplayText();
      if (this.displayText.indexOf("_") == -1){
        this.emit({key:"solved"})
      }
    }
  }

  emit(data){
    this.eventEmitter.emit(data);
  }



}
