import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealPage } from './meal.page';

const routes: Routes = [
  {
    path: '',
    component: MealPage
  },
  {
    path: 'edit-meal',
    loadChildren: () => import('./edit-meal/edit-meal.module').then( m => m.EditMealPageModule)
  },
  {
    path: 'edit-meal/:id',
    loadChildren: () => import('./edit-meal/edit-meal.module').then( m => m.EditMealPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealPageRoutingModule {}
