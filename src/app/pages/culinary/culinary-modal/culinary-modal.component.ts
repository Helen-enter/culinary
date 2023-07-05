import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../../services/recipe/recipe.service";
import {IRecipe} from "../../../models/recipe";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-culinary-modal',
  templateUrl: './culinary-modal.component.html',
  styleUrls: ['./culinary-modal.component.scss']
})
export class CulinaryModalComponent implements OnInit {

  recipe: IRecipe

  changeRecipeEl = false

  ingredients: string
  description: string

  constructor(public recipeService: RecipeService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe()
  }

  close() {
    this.recipeService.setDescription(true)

    this.recipeService.setShowModal(false)
    this.recipeService.getShowModal()
  }

  changeRecipe(ev: Event, recipe: IRecipe) {
    const ingredients = this.changeRecipeIngredients(ev, recipe)
    const description = this.changeRecipeDescription(ev, recipe)

    const recipeObj: IRecipe = {
      title: recipe.title,
      ingredients: ingredients,
      description: description,
      category: recipe.category,
      // id: string
      recipeId: recipe.recipeId,
      userId: recipe.userId,
      img: recipe.img,
      _id: recipe._id
    }

    this.recipeService.updateRecipe(recipeObj)

    console.log('ev.target.value', ingredients, description)

  }

  changeRecipeIngredients(ev: Event, recipe: IRecipe) {
    //@ts-ignore
    return recipe.ingredients = ev.target.value
  }

  changeRecipeDescription(ev: Event, recipe: IRecipe) {
    //@ts-ignore
    return recipe.description = ev.target.value

  }

  sendNewRecipe(recipe: IRecipe) {
    this.recipeService.sendNewRecipe(recipe)
    this.messageService.add({severity: 'success', summary: "Вы изменили рецепт!"})

    this.recipeService.setDescription(true)
    this.recipeService.getDescription()
  }

}
