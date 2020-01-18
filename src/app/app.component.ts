import { Component } from '@angular/core';
import { BrowserService } from './browser.service';
import { RoutingStateService } from './routing-state.service';
import { AuthService } from "./auth.service"
import { GameService } from "./game.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = 'Snapshot 19w05De';
  dark: boolean = false;

  constructor(
    private browserService: BrowserService,
    private routingStateService: RoutingStateService,
    private authService: AuthService,
    private gameService: GameService) {

    // begin updating location
    browserService.beginLocationUpdate();

    // begin updating navigation
    routingStateService.loadRouting();

  }

  ngOnInit(){
    console.log("test");
    this.authService.CheckLogin().then(loggedIn=>{
      if (loggedIn){
        this.checkInitialUsername();
      }
    })
  }

  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;
  }



  checkInitialUsername(){
    this.gameService.FetchUsername(this.authService.GetUserId()).then(username=>{
      if (username=="Hunter"){
        this.gameService.SetUsername(this.authService.GetUserDisplayName(),this.authService.GetUserId());
      }
    })
  }

}
