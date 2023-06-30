import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {IRecipe} from "../../models/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private culinaryUpdateSubject = new Subject<IRecipe[]>()

  readonly culinaryUpdateSubject$ = this.culinaryUpdateSubject

  isVisible$ = new BehaviorSubject<boolean>(false)

  show = true

  constructor() {}

  updateCulinary(data: IRecipe[]) {
    this.culinaryUpdateSubject.next(data)

  }

  isShow(show: boolean) {
    return this.show = show
  }

  open() {
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }


}
