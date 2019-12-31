import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'quest-hangman',
  templateUrl: './quest-hangman.component.html',
  styleUrls: ['./quest-hangman.component.css']
})
export class QuestHangmanComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();

  displayText: Array<string>;
  alphabets: Array<string> = 
    ['A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  alphabetsRevealed: string = " ";


  constructor() { }

  ngOnInit() {
    this.quest.questData.answer = this.quest.questData.answer.toUpperCase();
    if (this.quest.questData.given)
      this.alphabetsRevealed += this.quest.questData.given.toUpperCase();
    this.constructDisplayText();
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
