import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'learn',
    pathMatch: 'full'
  },
  {
    path: 'learn',
    loadChildren: () => import('./learn/categories/learn-categories.module').then(m => m.LearnCategoriesModule)
  },
  {
    path: 'learn/:category',
    loadChildren: () => import('./learn/category/learn-category.module').then(m => m.LearnCategoryModule)
  },
  {
    path: 'questions/:id/:slug',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
