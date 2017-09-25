import { Injectable } from '@angular/core';
import { QuestionApi, Question, LoopBackFilter } from '../../sdk';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  constructor(
    private questionApi: QuestionApi
  ){}

  getQuestions(){
   let filter: LoopBackFilter = {
     "include":{
       "relation": "answers"
     }
   }
   return this.questionApi.find<Question>(filter)
   .toPromise()
  }

  getQuestion(questionId){
    let query = {
      id: questionId
    }
    return this.questionApi.find<Question>({where: query})
    .toPromise()
  }

  getQuestionsBySlug(slug){
    let filter: LoopBackFilter = {
      "include":{
        "relation": "answers"
      },
      "where": {
        "questionSlug": slug
      }
    }
    return this.questionApi.find<Question>(filter)
    .toPromise()
  }

  deleteQuestion(questionId){
    return this.questionApi.deleteById<Question>(questionId)
    .toPromise()
  }

  updateQuestion(values){
    let data = new Question();
    data.question = values.question;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    data.questionSlug = values.questionSlug;
    return this.questionApi.updateAttributes<Question>(values.id, data)
    .toPromise()
  }

  createQuestion(values){
    let data = new Question();
    data.question = values.question;
    data.questionSlug = values.questionSlug
    return this.questionApi.create<Question>(data)
    .toPromise()
  }

}
