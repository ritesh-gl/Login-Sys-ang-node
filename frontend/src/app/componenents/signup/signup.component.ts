import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupForm:FormGroup;
signUpMessage:any;

  constructor(private authService:AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.signupForm=this.createFormGroup();
    console.log(this.signupForm.value);

    console.log("hello");

  }

  createFormGroup():FormGroup{
    console.log("hello");

    return new FormGroup({
      
      name:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required ]),

    });


  }

  signup(): void {
    console.log(this.signupForm.value)
    // this.authService
    // .signup(this.signupForm.value)
    // .subscribe(
      // {
      // check api response for success
      // console.log(res)
      // if(res.)
      // then redirect to login page
      // this.router.navigate(['login'])
      //else show error
    // }
    // );
    this.httpClient.post("http://localhost:3000/auth/signup",this.signupForm.value)
    .subscribe((res)=>{
      console.log(res)
      this.signUpMessage = res;
      if(this.signUpMessage.message === "User registered!"){
        alert("User registered.")
        this.router.navigate(['login'])
      }
    })

  }
}
