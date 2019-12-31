import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quest-openended',
  templateUrl: './quest-openended.component.html',
  styleUrls: ['./quest-openended.component.css']
})
export class QuestOpenendedComponent implements OnInit {
  @Input() quest: any;
  @Output() eventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  
  emit(data){
    this.eventEmitter.emit(data);
  }
}
