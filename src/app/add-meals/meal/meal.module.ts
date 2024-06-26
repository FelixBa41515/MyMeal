import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealPageRoutingModule } from './meal-routing.module';

import { MealPage } from './meal.page';
import {SharedModule} from '../../shared/shared.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealPageRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  declarations: [MealPage]
})
export class MealPageModule {}
