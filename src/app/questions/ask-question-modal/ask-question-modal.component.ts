import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-ask-question-modal',
  templateUrl: './ask-question-modal.component.html',
  styleUrls: ['./ask-question-modal.component.scss'],
})
export class AskQuestionModalComponent implements OnInit {
  askQuestionForm: FormGroup;
   @Input() categoryId: string;

  constructor(
    private modalController: ModalController,
    private appService: AppService
  ){}

  ngOnInit() {
    this.askQuestionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createQuestion() {
    let question = new Question();
    question.title = this.askQuestionForm.value.title;;
    question.description = this.askQuestionForm.value.description;;
    question.categoryId = this.categoryId;

    this.appService.createQuestion(question)
    .subscribe(
      res => {
        this.dismissModal(res, null);
      },
      error => {
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
