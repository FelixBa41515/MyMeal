import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMealsPage } from './add-meals.page';

const routes: Routes = [
  {
    path: '',
    component: AddMealsPage
  },
  {
    path: 'meal',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMealsPageRoutingModule {}
