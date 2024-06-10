import {IMeasure} from './IMeasure'

export interface IExtendedIngredient{
  aisle?: string,
  amount?: number,
  consistency?:string,
  id?: number,
  image?: string,
  measures?: IMeasure,
  meta?:[],
  name?: string,
  original?:string,
  originalName?:string,
  unit?:string,
}
