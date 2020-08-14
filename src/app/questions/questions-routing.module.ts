import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionDetailsPageComponent } from './question-details-page/question-details-page.component';
import { QuestionDetailsPageResolver } from './question-details-page/question-details-page.resolver';

const routes: Routes = [
  {
    path: '',
    component: QuestionDetailsPageComponent,
    resolve: {
      data: QuestionDetailsPageResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [QuestionDetailsPageResolver]
})
export class QuestionsRoutingModule { }
