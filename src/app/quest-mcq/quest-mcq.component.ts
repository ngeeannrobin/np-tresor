import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quest-mcq',
  templateUrl: './quest-mcq.component.html',
  styleUrls: ['./quest-mcq.component.css']
})
export class QuestMcqComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  
  emit(data){
    this.eventEmitter.emit(data);
  }
}
