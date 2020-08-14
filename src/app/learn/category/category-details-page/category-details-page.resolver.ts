import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { forkJoin } from 'rxjs';

@Injectable()
export class CategoryDetailsPageResolver implements Resolve<any> {

  constructor(
    private appService: AppService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const categorySlug = route.paramMap.get('category');
    const category = this.appService.getCategoryBySlug(categorySlug);
    const questionsDtos = this.appService.getQuestionsByCategory(categorySlug);

    return forkJoin({ questions: questionsDtos, category: category });
  }
}
