import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { QuestionDetailsPage } from '../question-details/question-details';
import { ManageQuestionPage } from '../manage-question/manage-question';

@Component({
  selector: 'learn-details-page',
  templateUrl: 'learn-details.html'
})
export class LearnDetailsPage {

  questions: Array<any> = [];
  category : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    let category_param = navParams.get('category');
    this.category = isPresent(category_param) ? category_param : null;
  }

  createQuestionModal() {
    let create_question_modal = this.modalCtrl.create(ManageQuestionPage, { slug: this.category.slug });
    create_question_modal.onDidDismiss(data => {
      this.getQuestions();
    });
    create_question_modal.present();
  }

  ionViewWillEnter() {
   this.getQuestions();
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.questionService.getQuestionsBySlug(this.category.slug)
    .then(res => {
      this.questions = res;
      loading.dismiss();
    })
  }

  delete(questionId){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete this question?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.questionService.deleteQuestion(questionId)
            .then(res => this.getQuestions());
            this.answerService.getAnswers(questionId)
            .then(answers => {
              for(let answer of answers){
                this.answerService.deleteAnswer(answer.id);
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  addPositiveVote(question){
    let data = question;
    data.positiveVotes += 1;
    data.questionSlug = this.category.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  addNegativeVote(question){
    let data = question;
    data.negativeVotes += 1;
    data.questionSlug = this.category.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  countAnswers(questionId){
    return this.answerService.countAnswers(questionId)
    .then(res => console.log(res))
  }

  openAnswers(question){
    this.navCtrl.push(QuestionDetailsPage, {
      id: question.id
    });
  }

}
