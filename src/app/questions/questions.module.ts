import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionDetailsPageComponent } from './question-details-page/question-details-page.component';
import { AnswerQuestionModalComponent } from './answer-question-modal/answer-question-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuestionDetailsPageComponent, AnswerQuestionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    QuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
