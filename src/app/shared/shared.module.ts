import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealComponent} from './meal/meal.component'
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import {ApiMealComponent} from './api-meal/api-meal.component'
import {MealDetailsComponent} from './meal-details/meal-details.component'
import {FormsModule} from '@angular/forms'
import {SkeletonCardComponent} from './skeleton-card/skeleton-card.component'



@NgModule({
    declarations: [MealComponent, ApiMealComponent, MealDetailsComponent, SkeletonCardComponent],
    exports: [MealComponent, ApiMealComponent, MealDetailsComponent, SkeletonCardComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
    ]
})
export class SharedModule { }
