import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {HomeComponent} from './home/home.component';
import {QuizComponent} from './home/quiz/quiz.component';
import {LeaderBoardComponent} from './home/leader-board/leader-board.component'

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent}
    ]
  },
  { path: 'home', component: HomeComponent},
  { path: 'quiz/:id', component: QuizComponent
  },
  { path: 'leader-board/:id',  component: LeaderBoardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
