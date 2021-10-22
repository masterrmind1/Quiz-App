import { rendererTypeName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as QuizData from './QuizData.json';
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor() { }

  getAllQuizes(): Observable<any>{
   const quizes =  QuizData.value.map((v) => {
      return {
        name: v.name,
        id: v.id,
        imageLink: v['image-link'],
        totalQuestion: v.questions.length,
        description: v.description
      };
    });
   return of(quizes);
  }

  getAllQuestions(id): Observable<any>{
    const quizes = QuizData.value.filter((v) => {
      return v.id === id;
    })[0];
    return of(quizes);
  }

  getDataByStorageId(id): Observable<any>{
    const quiz = QuizData.value.filter( (v) => {
      return v.storageId === id;
    })[0];
    return of(quiz);
  }
}
