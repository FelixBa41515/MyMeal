import {Component, OnInit, inject, AfterViewInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {IRecipe} from '../../../models/IRecipe'
import {firstValueFrom, Observable} from 'rxjs'
import {IInstruction} from '../../../models/IInstruction'
import {DatabaseService} from '../../services/database.service'
import {IUserRecipe} from '../../../models/IUserRecipe'
import {ScreenReader} from '@capacitor/screen-reader'
import {PhotoService} from '../../services/photo.service'
import {TextToSpeech} from '@capacitor-community/text-to-speech'

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage {
  activatedRoute = inject(ActivatedRoute)
  databaseService = inject(DatabaseService)
  photoService = inject(PhotoService)
  id = this.activatedRoute.snapshot.paramMap.get('id')
  deleted: boolean = true
  recipe: IRecipe | undefined = undefined
  instructions: IInstruction | undefined = undefined
  originalServings: number | undefined = undefined
  chosenServings: number | undefined = undefined
  imageUrl: string = ''

  constructor() {
  }

  async ionViewWillEnter() {
    try {
      const observable: Observable<IUserRecipe> | undefined = await this.databaseService.retrieveRecipes()
      let userRecipe: IUserRecipe | undefined = undefined
      if (observable) {
        userRecipe = await firstValueFrom(observable)
      }
      this.recipe = userRecipe!.recipes.find(x => x.id === Number(this.id))
      if (this.recipe) {
        this.instructions = this.recipe.analyzedInstructions![0]
        this.originalServings = this.recipe!.servings
        this.chosenServings = this.recipe!.servings
        if (!this.recipe.image?.includes('http')) {
          this.imageUrl = await this.photoService.getImage(this.recipe.image!)
        } else {
          this.imageUrl = this.recipe.image
        }
      } else {
        console.log('Recipe not found')
      }

    } catch (error) {
      console.error(error)
    }
  }



  deleteRecipe() {
    this.deleted = false

    this.databaseService.removeRecipe(Number(this.id))
      .then(() => {
        if (!this.recipe?.image?.includes('http')) {
          this.photoService.deleteImage(this.recipe?.image!)
        }
        this.deleted = true
        window.history.back()
      })
      .catch(error => {
        console.error('Error removing recipe:', error)
      })
  };

  async ionViewWillLeave() {
    await TextToSpeech.stop()
  }


  async speakInstruction(text: string) {
    await TextToSpeech.stop()
    await TextToSpeech.speak({
        text: text,
        lang:"en"
      }
    )
  };

}
