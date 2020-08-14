import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskQuestionModalComponent } from './ask-question-modal/ask-question-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AskQuestionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AskQuestionModalComponent]
})
export class QuestionsSharedModule { }
