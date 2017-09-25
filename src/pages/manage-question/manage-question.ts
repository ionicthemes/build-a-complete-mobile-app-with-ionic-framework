import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { isPresent } from 'ionic-angular/util/util';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'manage-question-page',
  templateUrl: 'manage-question.html'
})
export class ManageQuestionPage {

  _detail_slug : string;
  questionSlug: string;
  questionForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: QuestionService
  ) {
    this.questionSlug = navParams.get('slug');
    this._detail_slug = isPresent(this.questionSlug) ? this.questionSlug : '';
  }

  ionViewWillLoad() {
    this.questionForm = new FormGroup({
      question: new FormControl('', Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmit(value){
    console.log(this._detail_slug)
    let data = value;
    data.questionSlug = this.questionSlug;
    this.questionService.createQuestion(value)
    .then( res => this.dismiss() )
  }

}
