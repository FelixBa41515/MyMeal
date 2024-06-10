import {AfterViewInit, Component, Input, OnInit} from '@angular/core'
import {ScreenReader} from '@capacitor/screen-reader'
import {IRecipe} from '../../../models/IRecipe'
import {IInstruction} from '../../../models/IInstruction'

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent  implements OnInit, AfterViewInit {
  @Input({required: true}) recipe!: IRecipe
  @Input({required: true}) instructions!: IInstruction
  originalServings: number|undefined = undefined
  chosenServings: number|undefined = undefined


  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit(){

    this.originalServings = this.recipe.servings
    this.chosenServings = this.recipe.servings
console.log(this.recipe)
  }
  speakInstruction = async (text: string) => {
    if ('speechSynthesis' in window) {
      const speechSynthesis = window.speechSynthesis;
      speechSynthesis.cancel(); // Stops any current speech
    }

    await ScreenReader.speak({
      value: text,
      language: 'en-US',
    });
  };
}
