import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRecipe} from "../../models/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeRestService {

  constructor(private http: HttpClient) { }

  getGeneralRecipes() {
    return this.http.get<IRecipe[]>('http://localhost:3000/general-recipes/')
  }

  getGeneralRecipesByCategories(category: string) {
    return this.http.get<IRecipe[]>(`http://localhost:3000/general-recipes/category/${category}`)
  }

  getGeneralRecipeById(recipeId: string) {
    return this.http.get<IRecipe>(`http://localhost:3000/general-recipes/recipe/${recipeId}`)
  }

  addGeneralRecipe(data: IRecipe) {
    return this.http.post<IRecipe>(`http://localhost:3000/general-recipes/`, data)
  }




  sendRecipeCulinaryBook(recipe: IRecipe) {
    return this.http.post<IRecipe>('http://localhost:3000/recipes/favorite', recipe, {headers: {}})
  }

  saveRecipe(data: FormData) {
    return this.http.post<IRecipe>('http://localhost:3000/recipes/', data, {headers: {}})
  }

  getRecipes() {
    return this.http.get<IRecipe[]>('http://localhost:3000/recipes')
  }

  getRecipeById(recipeId: string) {
    return this.http.get<IRecipe>(`http://localhost:3000/recipes/${recipeId}`, {headers: {}})
  }

  deleteRecipeById(recipeId: string) {
    return this.http.delete<IRecipe>(`http://localhost:3000/recipes/${recipeId}`)
  }

}
