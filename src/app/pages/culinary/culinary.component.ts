import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe/recipe.service";
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {RecipeRestService} from "../../services/rest/recipe-rest.service";

@Component({
  selector: 'app-culinary',
  templateUrl: './culinary.component.html',
  styleUrls: ['./culinary.component.scss']
})
export class CulinaryComponent implements OnInit {
  generalRecipes: IRecipe[]
  selectedCategory = ['супы', 'салаты', 'выпечка', 'закуски', 'десерты', 'десерты без сахара', 'горячее']

  isShowModal = false


  constructor(public recipeService: RecipeService,
              private userService: UserService,
              private messageService: MessageService,
              private recipeRestService: RecipeRestService) {
  }

  ngOnInit() {
    this.recipeService.setShowImg(true)
    this.recipeService.getShowImg()

    this.recipeService.culinaryUpdateSubject$.subscribe((data) => {
      this.generalRecipes = data
    })
    this.showAllRecipes()
  }

  showRecipesCategory(category: string) {
    this.recipeRestService.getGeneralRecipesByCategories(category).subscribe((data) => {
      this.generalRecipes = data
    })
  }

  showAllRecipes() {
    this.recipeRestService.getGeneralRecipes().subscribe((data) => {
      this.generalRecipes = data
    })
  }

  readRecipe(item: IRecipe) {
    // this.isShowModal = true
    this.recipeService.setShowModal(this.isShowModal = true)
    this.recipeService.getShowModal()

    this.recipeService.setRecipe(item)
  }

  saveRecipe(recipeId: string) {
    if (this.userService.getUser() && this.userService.getUser().id !=='') {
      const userId = this.userService.getUser().id
      this.recipeRestService.getGeneralRecipeById(recipeId).subscribe((data) => {
        console.log('data recipe', data, data.recipeId)
        const recipeObj: IRecipe = {
          _id: data._id,
          category: data.category,
          ingredients: data.ingredients,
          description: data.description,
          recipeId: data.recipeId,
          img: data.img,
          title: data.title,
          // @ts-ignore
          userId: userId
        }
        console.log('data img', data.img)
        if (userId) {
          console.log('recipeObj', recipeObj)
          this.recipeRestService.sendRecipeCulinaryBook(recipeObj).subscribe((data) => {
          })
        }
      })
      this.messageService.add({severity: 'success', summary: "Вы сохранили рецепт в кулинарную книгу!"})
    } else {
      this.messageService.add({severity: 'error', summary: "Вы не авторизованы!"})
    }
  }


}
