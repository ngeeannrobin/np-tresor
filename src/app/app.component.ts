import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = 'Release 0.3';
  dark: boolean = false;
  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;


  }
}
