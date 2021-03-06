import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curious-user',
  templateUrl: './curious-user.component.html',
  styleUrls: ['./curious-user.component.css']
})
export class CuriousUserComponent implements OnInit {

  constructor(private router: Router) { }
  showcontact = false;
  ngOnInit() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  redirect(){
    this.router.navigate(["/login"]);
  }

  togglecontact(){
    this.showcontact = !this.showcontact;
  }

}
