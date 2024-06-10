import {inject, Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {HttpClient, HttpParams} from '@angular/common/http'
import {ISpoonacularResult} from '../../models/ISpoonacularResult'
import {IRecipe} from '../../models/IRecipe'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly #apiKey = environment.SpoonacularApiKey
  readonly #baseURL = 'https://api.spoonacular.com/'
  #http = inject(HttpClient)
  constructor() { }

  getRecipes(vegetarian: boolean, vegan: boolean):Observable<ISpoonacularResult<IRecipe>> {
    let params = new HttpParams()
      .set('apiKey', this.#apiKey)
      .set('number', 100)
      .set('sort', 'random')
    if (vegetarian) {
      params = params.append('diet', 'vegetarian');
    }
    console.log(vegetarian)

    if (vegan) {
      params = params.append('diet', 'vegan');
    }
      console.log(vegan)
    const urlWithParams = `${this.#baseURL}recipes/complexSearch?${params.toString()}`;
    console.log('Final URL:', urlWithParams);  // Log the entire URL with params
    return this.#http
      .get <ISpoonacularResult<IRecipe>>(
        `${this.#baseURL}recipes/complexSearch`,
        {
          params,
          observe: 'body',
          responseType: 'json',
        },
      )
  }
  getRecipe(id:number):Observable<IRecipe> {
    const params = new HttpParams()
      .set('apiKey', this.#apiKey)
    return this.#http
      .get <IRecipe>(
        `${this.#baseURL}recipes/${id}/information`,
        {
          params,
          observe: 'body',
          responseType: 'json',
        },
      )
  }
}
