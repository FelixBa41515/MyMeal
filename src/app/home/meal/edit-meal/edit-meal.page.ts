import {Component, inject, OnInit} from '@angular/core'
import {IExtendedIngredient} from '../../../../models/IExtendedIngredient'
import {IStep} from '../../../../models/IStep'
import {IInstruction} from '../../../../models/IInstruction'
import {PhotoService} from '../../../services/photo.service'
import {DatabaseService} from '../../../services/database.service'
import {Photo} from '@capacitor/camera'
import {IRecipe} from '../../../../models/IRecipe'
import {ActivatedRoute} from '@angular/router'
import {IUserRecipe} from '../../../../models/IUserRecipe'
import {firstValueFrom, Observable} from 'rxjs'
import {Clipboard} from '@capacitor/clipboard'

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
})
export class EditMealPage implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  databaseService = inject(DatabaseService)
  id = this.activatedRoute.snapshot.paramMap.get('id')
  vegan: boolean = false
  vegetarian: boolean = false
  title = ''
  summary = ''
  prepTime: number|undefined = undefined
  servings: number|undefined = undefined
  name: string = ''
  amount: number|undefined = undefined
  unit: string = ''
  ingredient: IExtendedIngredient | undefined = undefined
  ingredients: IExtendedIngredient[] = []
  stepText:string = ''
  step: IStep | undefined = undefined
  instructions: IInstruction = {steps:[]}
  error = true
  noImage: boolean= false
  noIngredients:boolean = false
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
  photo : Photo | undefined = undefined
  recipe: IRecipe| undefined = undefined
  imageUrl: string | undefined = ''
  oldImage: string |undefined = undefined
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
    this.instructions.steps?.forEach((x,i)=> x.number = i + 1)
  }

  async addPhoto(){
    this.photo = await this.photoService.takePhoto()
    if(this.photo){
      this.imageUrl = this.photo.dataUrl!
    }
  }

  async saveRecipe(event: Event){
    event.preventDefault()
    this.saved = false
    this.noImage = false
    this.noSteps = false
    this.noIngredients = false
    this.noTitle = false
    this.noSummary = false
    this.noServings = false
    this.noPrepTime = false

    if(this.imageUrl === undefined){
      this.noImage = true
    }
    if(this.ingredients.length === 0){
      this.noIngredients = true
    }
    if(this.instructions.steps?.length === 0){
      this.noSteps = true
    }
    if(this.title === ''){
      this.noTitle = true
    }
    if(this.summary === ''){
      this.noSummary = true
    }
    if(this.servings === undefined || this.servings < 1 || this.servings > 12){
      this.noServings = true
    }
    if(this.prepTime === undefined){
      this.prepTime = -1
    }else if(this.prepTime < -1 || this.prepTime === 0){
      this.noPrepTime = true
    }


    if(this.noPrepTime || this.noTitle || this.noIngredients || this.noSteps || this.noImage || this.noServings || this.noSummary)
    {
      this.saved = true
      return
    }
    let imageName: string = ''
    if(this.oldImage){
      if(!this.photo){
        imageName = this.recipe?.image!
      }else{
        this.photoService.deleteImage(this.oldImage)
        imageName = await this.photoService.uploadImage(this.photo!.base64String!, this.photo!.format)
      }

    }else if(!this.imageUrl?.includes('http')){
      console.log(2)
      imageName = await this.photoService.uploadImage(this.photo!.base64String!, this.photo!.format)
    }else{
      console.log(3)
      imageName = this.recipe?.image!
    }

    const recipe: IRecipe = {
      image: imageName,
      title: this.title,
      summary: this.summary,
      servings: this.servings,
      preparationMinutes: this.prepTime,
      extendedIngredients: this.ingredients,
      analyzedInstructions: [this.instructions],
      id: this.recipe?.id,
      vegetarian: this.vegetarian,
      vegan: this.vegan
    }

    await this.databaseService.removeRecipe(Number(this.id))
    await this.databaseService.saveUserRecipe(recipe)
    this.saved = true


// Navigate to the new URL
    window.history.back()
  }
  constructor() {
  }

  async ngOnInit() {
    try {
      const observable: Observable<IUserRecipe> | undefined = await this.databaseService.retrieveRecipes();
      let userRecipe: IUserRecipe | undefined = undefined
      if (observable) {
        userRecipe = await firstValueFrom(observable);
      }
      this.recipe = userRecipe!.recipes.find(x => x.id === Number(this.id))
      if (this.recipe) {

        this.instructions = this.recipe.analyzedInstructions![0]
        this.ingredients = this.recipe.extendedIngredients!
        this.title = this.recipe.title!
        this.summary = this.recipe.summary!
        this.servings = this.recipe.servings
        this.prepTime = this.recipe.preparationMinutes
        this.instructions = this.recipe.analyzedInstructions![0]
        this.vegan = this.recipe.vegan!
        this.vegetarian = this.recipe.vegetarian!
        if(!this.recipe.image?.includes('http')){
          this.imageUrl = await this.photoService.getImage(this.recipe.image!)
          this.oldImage = this.recipe.image
        }else{
          this.imageUrl = this.recipe.image
        }
        console.log('old: ' + this.oldImage)
        console.log('new: ' + this.imageUrl)
      } else {
        console.log('Recipe not found')
      }

    } catch (error) {
      console.error(error)
    }

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
}
