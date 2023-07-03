import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRecipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipe/recipe.service";
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-culinary',
  templateUrl: './culinary.component.html',
  styleUrls: ['./culinary.component.scss']
})
export class CulinaryComponent implements OnInit {
  generalRecipes: IRecipe[]
  selectedCategory = ['супы', 'салаты', 'выпечка', 'закуски', 'десерты', 'десерты без сахара']

  isShowModal = false


  constructor(private http: HttpClient,
              public recipeService: RecipeService,
              private userService: UserService,
              private messageService: MessageService) {
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
    this.http.get<IRecipe[]>(`http://localhost:3000/general-recipes/category/${category}`).subscribe((data) => {
      this.generalRecipes = data
    })
  }

  showAllRecipes() {
    this.http.get<IRecipe[]>('http://localhost:3000/general-recipes/').subscribe((data) => {
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
    const userId = this.userService.getUser().id
    console.log('recipe', recipeId, userId)
    this.http.get<IRecipe>(`http://localhost:3000/general-recipes/recipe/${recipeId}`).subscribe((data) => {
      console.log('data recipe', data, data.recipeId)
      const recipeObj: IRecipe = {
        _id: data._id,
        category: data.category,
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
        this.http.post('http://localhost:3000/recipes/favorite', recipeObj, {headers: {}}).subscribe((data) => {

        })
      }
    })
    this.messageService.add({severity: 'success', summary: "Вы сохранили рецепт в кулинарную книгу!"})

  }

}
