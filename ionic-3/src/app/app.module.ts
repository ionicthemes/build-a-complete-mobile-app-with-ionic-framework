import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { LearnFeedPage } from '../pages/learn-feed/learn-feed';
import { LearnDetailsPage } from '../pages/learn-details/learn-details';
import { QuestionDetailsPage } from '../pages/question-details/question-details';
import { ManageQuestionPage } from '../pages/manage-question/manage-question';
import { ManageAnswerPage } from '../pages/manage-answer/manage-answer';

import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { LearnService } from '../services/learn.service';

import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../../sdk/index';

@NgModule({
  declarations: [
    MyApp,
    LearnFeedPage,
    LearnDetailsPage,
    QuestionDetailsPage,
    ManageQuestionPage,
    ManageAnswerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LearnFeedPage,
    LearnDetailsPage,
    QuestionDetailsPage,
    ManageQuestionPage,
    ManageAnswerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuestionService,
    AnswerService,
    LearnService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
