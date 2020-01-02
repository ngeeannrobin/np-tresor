import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-campaign-map',
  templateUrl: './campaign-map.component.html',
  styleUrls: ['./campaign-map.component.css']
})
export class CampaignMapComponent implements OnInit {

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;
          console.log(this.scrHeight, this.scrWidth);
    }

  points = [
    { x: 316, y: 118, radius: 26 }
  ]

  pointsHtml = []
  h: SafeHtml

  offsetHeight: number

  constructor(private sanitizer: DomSanitizer) { 

    this.getScreenSize();

  }

  ngOnInit() { 
    this.points.forEach(p => {
      //this.pointsHtml.push("<img src='assets/image/quest_dot.png'" + "style='position:absolute; top:" + (p.x * this.map.nativeElement.offsetHeight) + "px" + "' />")
      this.h = this.sanitizer.bypassSecurityTrustHtml("<img src='assets/image/quest_dot.png'" + "style='position:absolute;top:" + (p.y * this.scrHeight / 812 - p.radius) + "px;left:" + (p.x * this.scrWidth / 375 - p.radius) + "px' />")
      //this.h = this.sanitizer.bypassSecurityTrustHtml("<img src='assets/image/quest_dot.png' [ngStyle]=\"{'top': " + p.x + "* offsetHeight }\" />")
    });
  }
}
