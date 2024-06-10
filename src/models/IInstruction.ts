import {IStep} from './IStep'

export interface IInstruction{
  name?: string,
  steps?:IStep[],
}
