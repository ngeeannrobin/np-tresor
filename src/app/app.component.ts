import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = 'Snapshot 19w05Aa';
  dark: boolean = false;
  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;
  }
}
