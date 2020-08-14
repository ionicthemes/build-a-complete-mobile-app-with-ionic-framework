import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { AnswerQuestionModalComponent } from '../answer-question-modal/answer-question-modal.component';
import { AppService } from '../../app.service';
import { Answer } from '../../models/answer.model';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-details-page',
  templateUrl: './question-details-page.component.html',
  styleUrls: ['./question-details-page.component.scss'],
})
export class QuestionDetailsPageComponent implements OnInit {
  answers: Answer[];
  question: Question;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.data.subscribe(pageData => {
      this.answers = pageData.data.answers;
      this.question = pageData.data.question;
    });
  }

  voteQuestion(vote: number) {
    this.appService.voteQuestion(this.question._id, vote)
    .subscribe((res: any) => {
      if(res.status == 200) {
        if (vote == 1) {
          this.question.positiveVotes ++;
        } else {
          this.question.negativeVotes ++;
        }
      }
    })
  }

  voteAnswer(answer: Answer, vote: number) {
    this.appService.voteAnswer(answer._id, vote)
    .subscribe((res: any) => {
      if(res.status == 200) {
        if (vote == 1) {
          answer.positiveVotes ++;
        } else {
          answer.negativeVotes ++;
        }
      }
    })
  }

  async deleteAnswer(answer: Answer) {
   const alert = await this.alertController.create({
     header: 'Confirm',
     message: 'Are you sure you want to delete this answer?',
     buttons: [
       {
         text: 'Cancel',
         role: 'cancel',
         cssClass: 'secondary'
       }, {
         text: 'Yes',
         handler: () => {
           this.appService.deleteAnswer(answer._id)
           .subscribe(res => {
             this.answers = this.answers.filter(x => x._id != answer._id);
           }, err => {
             console.log('error', err);
           })
         }
       }
     ]
   });

   await alert.present();
 }

  async updateAnswer(answer: Answer) {
    const modal = await this.modalController.create({
      component: AnswerQuestionModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'answerToUpdate': answer,
        'questionId': this.question._id
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.success) {
      answer.answer = data.success;
    }
  }

  async openAnswerModal() {
    const modal = await this.modalController.create({
      component: AnswerQuestionModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'questionId': this.question._id
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.success) {
      const answer = data.success;
      this.answers.push(answer);
    }
  }
}
