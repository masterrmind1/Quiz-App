import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: any = {};
  @Input() questionImage: any = {};
  answerValue;
  rendomisingOptions = true;
  @Output() nextQuestion: EventEmitter<string> = new EventEmitter();
  options = [];
  optionsControl = new FormControl('', );
  optionsStyleArray = [-1, -1, -1, -1];
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.questionImage);
  }

  randomiseOptions(arr, n): any{
    this.rendomisingOptions = false;
    for (let i = n - 1; i > 0; i--)
    {
        // Pick a random index from 0 to i inclusive
        const j = Math.floor(Math.random() * (i + 1));
        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.rendomisingOptions = true;
  }

  optionSeleted(val, i): any{
   // this.optionsControl.disable();
    if (val.marks === 1){
      this.optionsStyleArray[i] = 1;
      this.toastr.success('' , 'Correct Answer');
    }else{
      this.optionsStyleArray[i] = 0;
      this.toastr.error('', 'wrong Answer');
      this.highlightRightAnswer();
    }
    this.nextQuestion.emit(val.marks);
  }

  getAnswerStyle(i): any{
    if (this.optionsStyleArray[i] === 1){
      return 'positive';
    }else if (this.optionsStyleArray[i] === 0){
      return 'negative';
    }else{
      return '';
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: any): void {
    this.optionsControl.patchValue('');
    this.options = this.question.options;
    this.randomiseOptions(this.options, this.options.length);
    this.optionsStyleArray = [-1, -1, -1, -1];
    this.optionsControl.enable();
    this.answerValue = undefined;
  }
  setBackgroundIamge(): any{
    const styles = {
      'background-image': '../../../../assets/' + this.questionImage,
    };
    return styles;
  }
  highlightRightAnswer(): any{
    if (this.options[0].marks === 1){
      this.optionsStyleArray[0] = 1;
    }else if (this.options[0].marks === 1){
      this.optionsStyleArray[1] = 1;
    }else if (this.options[0].marks === 1){
      this.optionsStyleArray[2] = 1;
    }else{
      this.optionsStyleArray[3] = 1;
    }
  }
}
