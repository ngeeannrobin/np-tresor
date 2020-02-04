import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }
  @Input() v: number;
  @Input() showTitle: boolean;

  ngOnInit() {
  }

}
