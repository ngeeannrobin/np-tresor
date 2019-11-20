import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor() { }
  show:boolean = false;
  dark:boolean = false;
  ngOnInit() {
  }

  Toggle(){
    console.log("toggle")
    this.show = !this.show;
  }

  toggleTheme(){
    document.documentElement.setAttribute("data-theme",this.dark?"default":"dark");
    this.dark = !this.dark;
  }

}
