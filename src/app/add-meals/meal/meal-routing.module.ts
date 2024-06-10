import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealPage } from './meal.page';

const routes: Routes = [
  {
    path: '',
    component: MealPage
  },
  {
    path: ':id',
    loadChildren: () => import('./meal.module').then(m => m.MealPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealPageRoutingModule {}
