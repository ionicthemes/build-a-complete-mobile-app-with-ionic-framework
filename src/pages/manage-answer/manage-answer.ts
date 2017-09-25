import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../../sdk';


@Component({
  selector: 'manage-answer-page',
  templateUrl: 'manage-answer.html'
})
export class ManageAnswerPage {

  _mode : string;
  _question_id: string;
  _answer_id: string;
  answerForm: FormGroup;
  answer: Answer = new Answer();

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public answerService: AnswerService
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
    if(data.answer){
      this.answer = data.answer;
    }
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answer.answer, Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmit(value){
    let data = value;
    data.questionId = this._question_id;
    if(this.answer.answer){
      data.id = this.answer.id;
      data.positiveVotes = this.answer.positiveVotes;
      data.negativeVotes = this.answer.negativeVotes;
      this.answerService.updateAnswer(data)
      .then( res => this.dismiss())
    }
    else{
      this.answerService.createAnswer(value)
      .then( res => this.dismiss())
    }
  }

}
