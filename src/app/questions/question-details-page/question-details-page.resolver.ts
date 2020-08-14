import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable()
export class QuestionDetailsPageResolver implements Resolve<any> {

  constructor(
    private appService: AppService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const questionId = route.paramMap.get('id');
    const question = this.appService.getQuestionById(questionId);
    const answers = this.appService.getQuestionAnswers(questionId);

    return forkJoin({ question: question, answers: answers });
  }
}
