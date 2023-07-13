import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IRecipe} from "../../models/recipe";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private culinaryUpdateSubject = new Subject<IRecipe[]>()
  readonly culinaryUpdateSubject$ = this.culinaryUpdateSubject


  // private recipesUpdateSubject = new Subject<IRecipe>()
  // readonly recipesUpdateSubject$ = this.recipesUpdateSubject

  recipe: IRecipe

  isShowModal: boolean

  isShowImg: boolean

  isShowDescription: boolean = true

  descriptionRecipe: IRecipe


  constructor(private http: HttpClient) {
  }

  updateCulinary(data: IRecipe[]) {
    this.culinaryUpdateSubject.next(data)

  }

  setShowModal(show: boolean) {
    this.isShowModal = show
  }

  getShowModal() {
    return this.isShowModal
  }

  setShowImg(show: boolean) {
    this.isShowImg = show
  }

  getShowImg() {
    return this.isShowImg
  }

  setRecipe(item: IRecipe) {
    this.recipe = item
  }

  getRecipe() {
    return this.recipe
  }

  setDescription(item: boolean) {
    this.isShowDescription = item
  }

  getDescription() {
    return this.isShowDescription
  }

  updateRecipe(recipe: IRecipe) {
    this.setShowModal(true)
    this.getShowModal()
    this.setRecipe(recipe)


    this.setDescription(false)
    this.getDescription()

    console.log('вы хотите изменить рецепт:', recipe)
  }

  sendNewRecipe(recipe: IRecipe) {

    console.log(recipe, recipe._id, 'отправить рецепт')
    this.http.put<IRecipe>(`http://localhost:3000/recipes/${recipe._id}`, recipe, {headers: {}}).subscribe((data) => {

    })


  }


}
