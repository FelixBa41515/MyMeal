import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core'
import {ApiService} from '../services/api.service'
import {image} from 'ionicons/icons'
import {ISpoonacularResult} from '../../models/ISpoonacularResult'
import {IRecipe} from '../../models/IRecipe'
import {firstValueFrom, map, Observable, Subscription} from 'rxjs'
import {DatabaseService} from '../services/database.service'
import {IUserRecipe} from '../../models/IUserRecipe'
import {IonContent, IonInfiniteScroll} from '@ionic/angular'

@Component({
  selector: 'app-add-meals',
  templateUrl: './add-meals.page.html',
  styleUrls: ['./add-meals.page.scss'],
})
export class AddMealsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll
  @ViewChild(IonContent) content?: IonContent
  vegetarian: boolean = false
  vegan: boolean = false
  loaded: boolean = false
  apiService = inject(ApiService)
  databaseService = inject(DatabaseService)
  recipesApi: Observable<ISpoonacularResult<IRecipe>> | undefined = undefined
  recipesDb: IRecipe[] = []
  allRecipes: IRecipe[] = []
  UserRecipes: Observable<IUserRecipe> |undefined = undefined
  displayedRecipes: IRecipe[] = []
  recipesPerPage = 10

  constructor() {
  }
  async ngOnInit() {
    this.loaded = false
    this.UserRecipes = await this.databaseService.retrieveRecipes()
    this.loadRecipes()
  }

  loadRecipes() {
    this.loaded = false
    this.recipesApi = this.apiService.getRecipes(this.vegetarian, this.vegan)
    this.recipesApi.subscribe((spoonacularResult: ISpoonacularResult<IRecipe>) => {
      this.allRecipes = spoonacularResult.results.filter(x => !this.recipesDb.some(y => x.id === y.id))
      this.displayedRecipes = this.allRecipes.slice(0, this.recipesPerPage)

      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = false
        if (this.content) {
          this.content.scrollToTop()
        }
      }
      this.loaded = true
    })
  }

  changeVegetarian(){
    this.loadRecipes()
  }

  changeVegan (): void {
    this.loadRecipes()
  }

  loadData(event: any) {
    if (this.displayedRecipes.length === this.allRecipes.length){
      event.target.disabled = true
    }
    const startIndex = this.displayedRecipes.length
    const endIndex = Math.min(startIndex + this.recipesPerPage, this.allRecipes.length);

    if (endIndex < this.allRecipes.length) {
      const additionalRecipes = this.allRecipes.slice(startIndex, endIndex)
      this.displayedRecipes = [...this.displayedRecipes, ...additionalRecipes]

    } else {
      event.target.disabled = true

    }

    event.target.complete()
  }

}
