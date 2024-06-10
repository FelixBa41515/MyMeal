import {Component, inject, Input, OnInit} from '@angular/core'
import {IRecipe} from '../../../models/IRecipe'
import {DatabaseService} from '../../services/database.service'
import {PhotoService} from '../../services/photo.service'

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  imageUrl: string = ''
  @Input({required: true}) recipe!: IRecipe
  #dbService = inject(DatabaseService)
  #photoService = inject(PhotoService)
  saveRecipe(): void {
    if (this.recipe) {
      this.#dbService.saveUserRecipe(this.recipe).then()
    }
  }

  constructor()
  {
  }

 async ngOnInit() {
    const firstDotIndex = this.recipe.summary!.indexOf('.');
    this.recipe.summary! = firstDotIndex !== -1 ? this.recipe.summary!.substring(0, firstDotIndex + 1) : '';

    if(!this.recipe.image?.includes('http')){
      this.imageUrl = await this.#photoService.getImage(this.recipe.image!)
    }else{
      this.imageUrl = this.recipe.image
    }
  }



}
