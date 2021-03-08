import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from './componenents/navigation/navigation.component';
import { SignupComponent } from './componenents/signup/signup.component';
import { LoginComponent } from './componenents/login/login.component';
import { HomeComponent } from './componenents/home/home.component';
import { PostsComponent } from './componenents/posts/posts.component';

const routes: Routes = [
  
   {path: "", component: HomeComponent},
   {path: "posts", component: PostsComponent},
   {path: "login", component: LoginComponent},
   {path: "signup", component: SignupComponent},
   {path: "**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
