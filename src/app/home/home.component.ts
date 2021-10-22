import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as navData from './nav-list.json';
import { Router } from '@angular/router';
import {QuizServiceService} from '../services/quiz-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showFiller = false;
  mobileQuery: MediaQueryList;
  navItems = navData.value;
  quizData;
  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private quizService: QuizServiceService, private router: Router, ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this. getQuizData();
  }


  getQuizData(): any{
    this.quizService.getAllQuizes().subscribe(quizData => {
      this.quizData = quizData;
    });
  }

  goToQuiz(id): any{
    console.log(id);
    this.router.navigate(['/quiz/', id]);
  }

  logout(): any{
    this.router.navigate(['/sign-in']);
    sessionStorage.removeItem('current-user');
  }
}
