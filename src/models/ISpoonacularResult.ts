export interface ISpoonacularResult<T> {
  results: T[]
  number:number,
  offset: number
  totalResults: number,
}
export interface ISpoonacularResultSingle<T> {
  result: T[]
  number:number,
  offset: number
  totalResults: number,
}
