import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  navs: Array<any> = [
    {text: "Wander", route: "/ViewQuest"},
    {text: "Campaign", route: "/Campaign/Tutorial"},
    {text: "Leaderboard", route: "/leaderboard"},
    {text: "Profile", route: "/profile"}
  ]

  ngOnInit() {
  }

  NavTo(route){
    this.router.navigate([route]);
  }

}
