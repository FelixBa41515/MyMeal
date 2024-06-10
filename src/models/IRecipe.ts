import {IStep} from './IStep'
import {IInstruction} from './IInstruction'
import {IIngredient} from './IIngredient'
import {IExtendedIngredient} from './IExtendedIngredient'

export interface IRecipe{
  vegetarian?: boolean,
  vegan?: boolean,
  glutenFree?: boolean,
  dairyFree?: boolean,
  veryHealthy?: boolean,
  cheap?: boolean,
  veryPopular?: boolean,
  sustainable?:boolean,
  lowFodmap?: boolean,
  weightWatcherSmartPoints?: number,
  gaps?: string,
  preparationMinutes?:number,
  cookingMinutes?: number,
  aggregateLikes?: number,
  healthScore?: number,
  creditsText?: string,
  sourceName?: string,
  pricePerServing?: number,
  id?: number,
  title?: string,
  readyInMinutes?:number,
  servings?: number,
  sourceUrl?:string,
  image?: string,
  imageType?: string,
  summary?: string
  cuisines?:[],
  dishTypes?:string[],
  diets?:string[],
  occasions?: [],
  analyzedInstructions?:IInstruction[],
  extendedIngredients?: IExtendedIngredient[],
  spoonacularScore?: number,
  spoonacularSourceUrl?: string,
  isFavourite?: boolean,
}







