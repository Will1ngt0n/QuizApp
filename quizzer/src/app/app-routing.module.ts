import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'choose-category', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'choose-category', loadChildren: './choose-category/choose-category.module#ChooseCategoryPageModule' },
  { path: 'show-results', loadChildren: './show-results/show-results.module#ShowResultsPageModule' },
  { path: 'view-quiz/:key', loadChildren: './view-quiz/view-quiz.module#ViewQuizPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
