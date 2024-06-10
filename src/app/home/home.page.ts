import {Component, inject, OnInit} from '@angular/core'
import {ApiService} from '../services/api.service'
import {image} from 'ionicons/icons'
import {DatabaseService} from '../services/database.service'
import {IRecipe} from '../../models/IRecipe'
import {Observable, Subscription} from 'rxjs'
import {IUserRecipe} from '../../models/IUserRecipe'
import {Photo} from '@capacitor/camera'
import {PhotoService} from '../services/photo.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  databaseService = inject(DatabaseService)
  recipes: IRecipe[] = []
  UserRecipes: Observable<IUserRecipe>|undefined = undefined
  vegetarian: boolean = false
  vegan: boolean = false
  name: string = ''
  filteredRecipes: IRecipe[] = []
  noRecipes: boolean = false
  loaded: boolean = false
  displayedRecipes: IRecipe[] = [] // Store the recipes to be displayed
  recipesPerPage = 10 // Number of recipes to show per page
  Filter() {
    this.loaded = false
    this.noRecipes = false
    this.filteredRecipes = this.recipes.filter(x => (
      (this.vegetarian ? x.vegetarian : true) &&
      (this.vegan ? x.vegan : true) &&
      (x.title?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()))
    ))
    if(this.filteredRecipes.length === 0){
      this.noRecipes = true
    }else{
      this.displayedRecipes = this.filteredRecipes.slice(0, this.recipesPerPage)
    }
    this.loaded = true
    this.name = ''
  }

  constructor() {
  }



async ionViewWillEnter(){
  this.loaded = false
  this.UserRecipes = await this.databaseService.retrieveRecipes()
  if(this.UserRecipes === undefined){
    this.loaded = true
  }else {
    this.UserRecipes.subscribe(async (userRecipe: IUserRecipe) => {
      this.recipes = userRecipe.recipes.reverse()
      this.filteredRecipes = this.recipes
      this.displayedRecipes = this.filteredRecipes.slice(0, this.recipesPerPage)
      this.loaded = true

    })
  }
}
  loadData(event: any) {
  if (this.displayedRecipes.length === this.recipes.length){
    event.target.disabled = true
  }
    const startIndex = this.displayedRecipes.length
    const endIndex = Math.min(startIndex + this.recipesPerPage, this.recipes.length);

    if (endIndex <= this.recipes.length) {
      const additionalRecipes = this.recipes.slice(startIndex, endIndex)
      this.displayedRecipes = [...this.displayedRecipes, ...additionalRecipes]

    } else {
      event.target.disabled = true

    }

    event.target.complete()
  }
}
