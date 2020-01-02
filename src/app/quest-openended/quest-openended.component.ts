import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quest-openended',
  templateUrl: './quest-openended.component.html',
  styleUrls: ['./quest-openended.component.css']
})
export class QuestOpenendedComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  playerAnswer:string = "";
  constructor() { }

  ngOnInit() {
  }

  
  emit(data){
    this.eventEmitter.emit(data);
  }

  answer(answer:string):void{
    if (answer.toUpperCase()==this.quest.questData.answer.toUpperCase()){
      this.emit({key:"solved"})
    } else {
      this.quest.questData.question+= "-no";
      this.playerAnswer = "";
    }
  }
}
