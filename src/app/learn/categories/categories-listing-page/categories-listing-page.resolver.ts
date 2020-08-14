import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesListingPageResolver implements Resolve<any> {

  constructor(private appService: AppService) { }

  resolve(): Observable<Category[]>  {
    return this.appService.getCategories();
  }
}
