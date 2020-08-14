import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnCategoryRoutingModule } from './learn-category-routing.module';
import { CategoryDetailsPageComponent } from './category-details-page/category-details-page.component';
import { IonicModule } from '@ionic/angular';
import { QuestionsSharedModule } from 'src/app/questions/questions-shared.module';

@NgModule({
  declarations: [CategoryDetailsPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    LearnCategoryRoutingModule,
    QuestionsSharedModule
  ]
})
export class LearnCategoryModule { }
