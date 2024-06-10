import {Component, inject, OnInit} from '@angular/core'
import {firstValueFrom} from 'rxjs'
import {IRecipe} from '../../../models/IRecipe'
import {ActivatedRoute} from '@angular/router'
import {ApiService} from '../../services/api.service'
import {DatabaseService} from '../../services/database.service'
import {IInstruction} from '../../../models/IInstruction'
import {ScreenReader} from '@capacitor/screen-reader'
import {TextToSpeech} from '@capacitor-community/text-to-speech'

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  apiService = inject(ApiService)
  id = this.activatedRoute.snapshot.paramMap.get('id')
  loaded: boolean = false
  recipe: IRecipe | undefined = undefined
  instructions: IInstruction | undefined = undefined
  originalServings: number|undefined = undefined
  chosenServings: number|undefined = undefined
  constructor() { }

 async ngOnInit() {
    this.loaded = false
   await firstValueFrom(this.apiService.getRecipe(Number(this.id!))).then((recipe: IRecipe) => {
      this.recipe = recipe
      this.instructions = recipe.analyzedInstructions![0]
      this.originalServings = this.recipe!.servings
      this.chosenServings = this.recipe!.servings
    }).then(() => this.loaded = true).catch((error) => {
      console.error(error)
    })

  }


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
