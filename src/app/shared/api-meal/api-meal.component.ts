import {Component, inject, Input, OnInit} from '@angular/core'
import {DatabaseService} from '../../services/database.service'
import {firstValueFrom} from 'rxjs'
import {IRecipe} from '../../../models/IRecipe'
import {ApiService} from '../../services/api.service'
import {getUndecoratedClassWithAngularFeaturesDiagnostic} from '@angular/compiler-cli/src/ngtsc/annotations/common'

@Component({
  selector: 'app-api-meal',
  templateUrl: './api-meal.component.html',
  styleUrls: ['./api-meal.component.scss'],
})
export class ApiMealComponent  implements OnInit {
  dbService = inject(DatabaseService)
  apiService = inject(ApiService)
  @Input({required: true}) shortRecipe: IRecipe|undefined = undefined
  longRecipe: IRecipe| undefined = undefined
  saved: boolean =false

 async saveRecipe(): Promise<void> {
    await firstValueFrom(this.apiService.getRecipe(this.shortRecipe!.id!)).then((recipe: IRecipe) => {
      this.longRecipe = recipe

    }).catch((error) => {
      console.error(error)
    })
    if (this.longRecipe) {
      this.dbService.saveUserRecipe(this.longRecipe).then()
      this.saved = true
    }

  }
  constructor() { }

  ngOnInit() {
    console.log(this.shortRecipe)
  }

}
