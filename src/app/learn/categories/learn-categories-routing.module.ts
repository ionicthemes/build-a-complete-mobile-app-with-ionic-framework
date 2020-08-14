import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesListingPageComponent } from './categories-listing-page/categories-listing-page.component';
import { CategoriesListingPageResolver } from './categories-listing-page/categories-listing-page.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListingPageComponent,
    resolve: {
      categories: CategoriesListingPageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoriesListingPageResolver]
})
export class LearnCategoriesRoutingModule { }
