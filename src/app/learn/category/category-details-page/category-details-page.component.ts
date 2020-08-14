import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { AskQuestionModalComponent } from 'src/app/questions/ask-question-modal/ask-question-modal.component';
import { AppService } from 'src/app/app.service';
import { Question } from 'src/app/models/question.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-details-page',
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.scss'],
})
export class CategoryDetailsPageComponent implements OnInit {
  questions: Question[];
  category: Category;

  constructor(
    private route: ActivatedRoute,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(pageData => {
      this.category = pageData.data.category;
      this.questions = pageData.data.questions? pageData.data.questions: [];
    });
  }

  async createQuestion() {
    const modal = await this.modalController.create({
      component: AskQuestionModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'categoryId': this.category._id
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.success) {
      const question = data.success;
      question.answersCount = 0;
      this.questions.push(question);
    }
  }

  async deleteQuestion(question: Question) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this Question?',
      buttons: [
       {
         text: 'Cancel',
         role: 'cancel',
         cssClass: 'secondary'
       }, {
         text: 'Yes',
         handler: () => {
           this.appService.deleteQuestion(question._id)
           .subscribe(res => {
             this.questions = this.questions.filter(x => x._id != question._id);
           }, err => {
             console.log('error', err);
           })
         }
       }
     ]
    });
    await alert.present();
  }
}
