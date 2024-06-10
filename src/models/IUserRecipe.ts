import {IRecipe} from './IRecipe'

export interface IUserRecipe{
  userId: string,
  recipes: IRecipe[],
}
