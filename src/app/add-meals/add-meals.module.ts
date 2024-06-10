import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMealsPageRoutingModule } from './add-meals-routing.module';

import { AddMealsPage } from './add-meals.page';
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddMealsPageRoutingModule,
        SharedModule
    ],
  declarations: [AddMealsPage]
})
export class AddMealsPageModule {}
