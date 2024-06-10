import {IIngredient} from './IIngredient'
import {IEquipment} from './IEquipment'
import {ILength} from './ILength'

export interface IStep{
  number?: number,
  step?: string,
  ingredients?: IIngredient[]
  equipment?:IEquipment[]
  length?: ILength[]
}
