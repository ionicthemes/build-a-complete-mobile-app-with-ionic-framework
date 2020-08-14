import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AppService } from '../../app.service';
import { Answer } from '../../models/answer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer-question-modal',
  templateUrl: './answer-question-modal.component.html',
  styleUrls: ['./answer-question-modal.component.scss'],
})
export class AnswerQuestionModalComponent implements OnInit {
  answerForm: FormGroup;
  @Input() questionId: string;
  @Input() answerToUpdate: Answer;

  constructor(
    private modalController: ModalController,
    private appService: AppService
  ){}

  ngOnInit() {
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answerToUpdate? this.answerToUpdate.answer: '', Validators.required),
    });
  }

  async submitAnswer() {
    const answer = this.answerForm.value.answer;
    let observable: Observable<any>;

    if (this.answerToUpdate) {
      observable = this.appService.updateAnswer(answer, this.answerToUpdate._id);
    } else {
      observable = this.appService.createAnswer(answer, this.questionId);
    }

    observable.subscribe(
      res => {
        this.dismissModal(this.answerToUpdate? answer: res, null);
      },
      error => {
        console.log("error", error);
        this.dismissModal(null, error);
      }
    );
  }

  dismissModal(success?: Object, error?: any) {
    this.modalController.dismiss({
      'success': success,
      'error': error
    });
  }
}
