import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn:boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.isLoggedIn = true;
    }
    // else{
    //   this.isLoggedIn = false;
    // }
  }
  logout(){
    if(localStorage.getItem("token")){
      localStorage.removeItem("token")
    }
    this.isLoggedIn = false;
  }

}