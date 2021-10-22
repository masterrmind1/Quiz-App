import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Local } from 'protractor/built/driverProviders';
import {QuizServiceService} from '../../services/quiz-service.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizName = '';
  storageId;
  questionImage;
  questionArray = [];
  indexQuestionValue = {};
  index = 0;
  totalMarks = 0;
  constructor( private quizService: QuizServiceService,
               private ngxService: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    const id = (this.router.url.split('/quiz/')[1]);
    this.getQuizQuestions(+id);
  }

  getQuizQuestions(id): any{
    this.quizService.getAllQuestions(id).subscribe(data => {
      this.quizName = data.name;
      this.storageId = data.storageId;
      this.questionArray = data.questions;
      this.questionImage = data.imageName;
      this.randomiseQuestion(this.questionArray, this.questionArray.length);
    });
  }

  randomiseQuestion(arr, n): any{
    for (let i = n - 1; i > 0; i--)
    {
        // Pick a random index from 0 to i inclusive
        const j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.getFirstQuestion();
  }

  getFirstQuestion(): any{
    this.indexQuestionValue = this.questionArray[0];
  }

  getNextQuestion(mark): any{
    setTimeout(() => {
      this.ngxService.start();
      console.log('next question');
      this.totalMarks = this.totalMarks + (mark * 1);
      if (this.index === this.questionArray.length - 1){
        console.log('complete');
        console.log(this.totalMarks);
        this.updateLeaderBoard(this.totalMarks);
      }else{
      this.indexQuestionValue = this.questionArray[++this.index ];
      }
      this.ngxService.stop();
    }, 1000);
  }

  updateLeaderBoard(marks): any{
    const userEmail = sessionStorage.getItem('current-user');
    console.log(localStorage.getItem(this.storageId));
    if (localStorage.getItem(this.storageId)){
      const data = JSON.parse(localStorage.getItem(this.storageId));
      console.log(data[userEmail]);
      if (data[userEmail]){
        data[userEmail] = marks;
        localStorage.setItem(this.storageId, JSON.stringify(data));
      }else{
        data[userEmail] = marks;
        localStorage.setItem(this.storageId, JSON.stringify(data));
      }
    }else{
      const data = {};
      data[userEmail] = marks;
      console.log(data);
      localStorage.setItem(this.storageId, JSON.stringify(data));
    }
    this.router.navigate(['/leader-board/', this.storageId]);
  }

  logout(): any{
    this.router.navigate(['/sign-in']);
    sessionStorage.removeItem('current-user');
  }



}
