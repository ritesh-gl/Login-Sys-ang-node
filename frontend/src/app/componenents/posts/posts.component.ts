import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  users:any;
  token:any;
constructor(private httpClient: HttpClient, private router:Router) {   }
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
    this.router.navigate(['login']);
    }
    let token = localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-access-token',token);
    this.httpClient.post("http://localhost:3000/auth/showData",{},{headers})
    .subscribe((res)=>{
      console.log(res)
      this.users = res;
      this.users = this.users.user;
      console.log(this.users)
    })
   
  }

}
