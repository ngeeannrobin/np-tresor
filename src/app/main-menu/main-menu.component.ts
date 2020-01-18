import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  async NavTo(route){
    await this.Delay(300);
    // Navigate
    this.router.navigate([route]);
  }

  async Delay(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
