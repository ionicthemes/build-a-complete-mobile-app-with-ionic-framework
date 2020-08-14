import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDetailsPageComponent } from './category-details-page/category-details-page.component';
import { CategoryDetailsPageResolver } from './category-details-page/category-details-page.resolver';


const routes: Routes = [
  {
    path: '',
    component: CategoryDetailsPageComponent,
    resolve: {
      data: CategoryDetailsPageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoryDetailsPageResolver]
})
export class LearnCategoryRoutingModule { }
