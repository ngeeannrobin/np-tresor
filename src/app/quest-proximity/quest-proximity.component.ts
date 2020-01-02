import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quest-proximity',
  templateUrl: './quest-proximity.component.html',
  styleUrls: ['./quest-proximity.component.css']
})
export class QuestProximityComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  
  emit(data){
    this.eventEmitter.emit(data);
  }

}
