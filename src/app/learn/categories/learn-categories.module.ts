import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LearnCategoriesRoutingModule } from './learn-categories-routing.module';
import { CategoriesListingPageComponent } from './categories-listing-page/categories-listing-page.component';


@NgModule({
  declarations: [CategoriesListingPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    LearnCategoriesRoutingModule
  ]
})
export class LearnCategoriesModule { }
