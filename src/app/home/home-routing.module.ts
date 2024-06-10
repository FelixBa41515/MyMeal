import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [

  {
    path: 'meal',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule),

  },
  {
    path: 'meal/:id',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule),
  },
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'create-meal',
    loadChildren: () => import('./create-meal/create-meal.module').then( m => m.CreateMealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
