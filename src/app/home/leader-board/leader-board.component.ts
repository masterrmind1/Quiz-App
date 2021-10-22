import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { Session } from 'inspector';
@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  leaderBoard;
  quizId;
  quizData;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'score'];
  constructor(private router: Router, private quizService: QuizServiceService) {
    this.quizId = this.router.url.split('/leader-board/')[1];
    console.log(this.quizId);
  }

  ngOnInit(): void {

    this.quizService.getDataByStorageId(this.quizId).subscribe( (v) =>{
      this.quizData = v;
    });
    const data = JSON.parse(localStorage.getItem(this.quizId));
    const propertyNames = Object.keys(data);
    const valuesNames = Object.values(data);
    const tempArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < propertyNames.length; i++){
      const obj = {};
      obj['name'] = propertyNames[i];
      obj['value'] =  valuesNames[i];
      console.log(obj);
      tempArray.push(obj);
    }
    this.leaderBoard = new MatTableDataSource(tempArray);
    this.leaderBoard.sort = this.sort;
  }

  goToHome(): any{
    this.router.navigate(['/home']);
  }
  logout(): any{
    this.router.navigate(['/sign-in']);
    sessionStorage.removeItem('current-user');
  }


}
