import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Answer } from './models/answer.model';
import { Question } from './models/question.model';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  // --------------- Categories Operations ---------------
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.API_URL + 'categories');
  }

  getCategoryBySlug(categorySlug: string): Observable<Category> {
    return this.http.get<Category>(environment.API_URL + 'categories/' + categorySlug);
  }

  // --------------- Answers CRUD Operations ---------------
  getQuestionAnswers(questionId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(environment.API_URL + 'answers/' + questionId);
  }

  updateAnswer(answer: string, answerId: string) {
    const body = {
    	"_id": answerId,
    	"answer": answer
    }
    return this.http.post(environment.API_URL + 'answers/update', body);
  }

  deleteAnswer(answerId: string) {
    return this.http.delete(environment.API_URL + 'answers/' + answerId);
  }

  createAnswer(answer: string, questionId: string) {
    const body = {
    	"answer": answer,
    	"questionId": questionId
    }
    return this.http.post(environment.API_URL + 'answers/insert', body);
  }

  voteAnswer(answerId: string, vote: number) {
    // vote should be 1 or -1
    const body = {
    	"answerId": answerId,
    	"vote": vote
    }
    return this.http.post(environment.API_URL + 'answers/vote', body);
  }

 // --------------- Questions CRUD Operations ---------------
  getQuestionById(questionId: string): Observable<Question> {
    return this.http.get<Question>(environment.API_URL + 'questions/' + questionId);
  }

  getQuestionsByCategory(categorySlug: string): Observable<Question[]> {
    return this.http.get<Question[]>(environment.API_URL + 'questions/by-category/' + categorySlug);
  }

  createQuestion(question: Question) {
    const body = {
    	"slug": this.slugify(question.title),
    	"title": question.title,
    	"description": question.description,
    	"categoryId": question.categoryId
    }
    return this.http.post(environment.API_URL + 'questions/insert', body);
  }

  deleteQuestion(questionId: string) {
    return this.http.delete(environment.API_URL + 'questions/' + questionId);
  }

  voteQuestion(questionId: string, vote: number) {
    // vote should be 1 or -1
    const body = {
    	"questionId": questionId,
    	"vote": vote
    }
    return this.http.post(environment.API_URL + 'questions/vote', body);
  }

  // --------------- Utils ---------------
  slugify(input: string): string {
    return input.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}
