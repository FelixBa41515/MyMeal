import {Component, inject, OnInit} from '@angular/core'
import {IExtendedIngredient} from '../../../models/IExtendedIngredient'
import {IStep} from '../../../models/IStep'
import {IInstruction} from '../../../models/IInstruction'
import {PhotoService} from '../../services/photo.service'
import {Photo} from '@capacitor/camera'
import {DatabaseService} from '../../services/database.service'
import {IRecipe} from '../../../models/IRecipe'
import {Clipboard} from '@capacitor/clipboard'


@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.page.html',
  styleUrls: ['./create-meal.page.scss'],
})
export class CreateMealPage {
  title = ''
  summary = ''
  vegan: boolean = false
  vegetarian: boolean = false
  prepTime: number | undefined = undefined
  servings: number | undefined = undefined
  name: string = ''
  amount: number | undefined = undefined
  unit: string = ''
  ingredient: IExtendedIngredient | undefined = undefined
  ingredients: IExtendedIngredient[] = []
  stepText: string = ''
  step: IStep | undefined = undefined
  instructions: IInstruction = {steps: []}
  noImage: boolean = false
  noIngredients: boolean = false
  noSteps: boolean = false
  noPrepTime: boolean = false
  noTitle: boolean = false
  noSummary: boolean = false
  noServings: boolean = false
  saved: boolean = true
  noIngredient: boolean = false
  noAmount: boolean = false
  noUnit: boolean = false
  noStep: boolean = false
  photoService = inject(PhotoService)
  databaseService: DatabaseService = inject(DatabaseService)
  imageUrl: string | undefined = undefined
  photo: Photo | undefined = undefined

  addIngredient() {
    this.noIngredient = false
    this.noAmount = false
    this.noUnit = false

    if (this.name === '') {
      this.noIngredient = true
    }
    if (this.amount === undefined) {
      this.noAmount = true
    }
    if (this.unit === '') {
      this.noUnit = true
    }
    if (this.noUnit || this.noAmount || this.noIngredient || this.amount! < 0) {
      return
    }

    this.ingredient = {name: this.name, measures: {metric: {amount: this.amount, unitLong: this.unit}}}
    this.ingredients.push(this.ingredient)
    this.name = ''
    this.amount = undefined
    this.unit = ''
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1)
  }

  addStep() {
    this.noStep = false
    if (this.stepText === '') {
      this.noStep = true
    }

    if (this.noStep) {
      return
    }
    this.step = {step: this.stepText, number: this.instructions.steps!.length + 1}
    this.instructions.steps!.push(this.step)
    this.stepText = ''
  }

  removeStep(index: number) {
    this.instructions.steps!.splice(index, 1)
    this.instructions.steps?.forEach((x, i) => x.number = i + 1)
  }

  async addPhoto() {
    this.photo = await this.photoService.takePhoto()
  }

  async saveRecipe(event: Event) {
    event.preventDefault()
    this.saved = false
    this.noImage = false
    this.noSteps = false
    this.noIngredients = false
    this.noTitle = false
    this.noSummary = false
    this.noServings = false
    this.noPrepTime = false

    if (this.photo === undefined) {
      this.noImage = true
    }
    if (this.ingredients.length === 0) {
      this.noIngredients = true
    }
    if (this.instructions.steps?.length === 0) {
      this.noSteps = true
    }
    if (this.title === '') {
      this.noTitle = true
    }
    if (this.summary === '') {
      this.noSummary = true
    }
    if (this.servings === undefined || this.servings < 1 || this.servings > 12) {
      this.noServings = true
    }
    if (this.prepTime === undefined) {
      this.noPrepTime = true
    }

    if (this.noPrepTime || this.noTitle || this.noIngredients || this.noSteps || this.noImage || this.noServings || this.noSummary) {
      this.saved = true
      return
    }
    const imageName = await this.photoService.uploadImage(this.photo!.base64String!, this.photo!.format)
    const recipe: IRecipe = {
      image: imageName,
      title: this.title,
      summary: this.summary,
      servings: this.servings,
      preparationMinutes: this.prepTime,
      extendedIngredients: this.ingredients,
      analyzedInstructions: [this.instructions],
      id: Date.now(),
      vegetarian: this.vegetarian,
      vegan: this.vegan
    }
    console.log(recipe)
    await this.databaseService.saveUserRecipe(recipe)
    this.saved = true
    window.history.back()
  }

  async pasteText(name: string) {
    const {value} = await Clipboard.read()
    switch (name) {
      case 'step':
        this.stepText = value
        break
      case 'summary':
        this.summary = value
        break
    }
  }

  constructor() {
  }




}
