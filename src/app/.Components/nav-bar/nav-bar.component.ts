import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  activeTab: string;

  constructor(
    private router: Router
  ) { }
  navs: Array<any> = [
    {text: "Wander", route: "/ViewQuest"},
    {text: "Campaign", route: "/Campaign/OpenHouse2020"},
    {text: "Leaderboard", route: "/leaderboard"},
    {text: "Profile", route: "/profile"}
  ]

  ngOnInit() {
    this.activeTab = this.router.url;
  }

  NavTo(route){
    // Navigate
    this.router.navigate([route]);
    
    // Update active tab
    this.activeTab = this.router.url;
  }

}
