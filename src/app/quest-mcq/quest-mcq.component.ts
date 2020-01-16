import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quest-mcq',
  templateUrl: './quest-mcq.component.html',
  styleUrls: ['./quest-mcq.component.css']
})
export class QuestMcqComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  optionArray: Array<string>;
  correctAnswer: string;
  selectedOption: string;
  constructor() { }

  ngOnInit() {
    this.correctAnswer = this.quest.questData.option[this.quest.questData.correctOption];
    this.optionArray = this.createOptnArray(this.quest.questData.randomise)
    console.log(this.quest.questData);
  }

  createOptnArray(randomise:boolean):Array<any>{
    let optionArray = [];
    let tempArray = [...this.quest.questData.option];
    
    if (randomise){
      for (let i=this.quest.questData.option.length; i>0; i--){
        let index = Math.floor(Math.random() * i);

        optionArray.push(tempArray[index]);
        tempArray.splice(index,1);
      }
    } else {
      tempArray.forEach(value=>{
        optionArray.push(value);
      })
    }
    return optionArray;
  }

  
  emit(data){
    this.eventEmitter.emit(data);
  }

  select(option){
    this.selectedOption = option;
  }

  check(){
    if (this.selectedOption==this.correctAnswer){
      this.emit({key:"solved"})
    } else {
      this.selectedOption = undefined;
      this.quest.questData.question+="-no"
    }
  }
}
