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

  constructor(public recipeService: RecipeService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe()
  }

  close() {
    this.recipeService.setShowModal(false)
    this.recipeService.getShowModal()
  }

  changeRecipe(ev: Event, recipe: IRecipe) {

    this.recipeService.updateRecipe(ev, recipe)
  //@ts-ignore
    recipe.description = ev.target.value
  }

  sendNewRecipe(recipe: IRecipe) {
    this.recipeService.sendNewRecipe(recipe)
    this.messageService.add({severity: 'success', summary: "Вы изменили рецепт!"})

    this.recipeService.setDescription(true)
    this.recipeService.getDescription()
  }

}
