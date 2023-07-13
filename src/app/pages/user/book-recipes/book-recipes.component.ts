import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {IRecipe} from "../../../models/recipe";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from "../../../services/recipe/recipe.service";
import {MessageService} from "primeng/api";
import {RecipeRestService} from "../../../services/rest/recipe-rest.service";


@Component({
  selector: 'app-book-recipes',
  templateUrl: './book-recipes.component.html',
  styleUrls: ['./book-recipes.component.scss']
})
export class BookRecipesComponent implements OnInit, OnDestroy {
  recipes: [] | any[] = []
  category: string
  description: string
  ingredients: string
  title: string
  img?: string

  recipeForm: FormGroup

  isShowRecipes = false
  isShowAddRecipes = false
  isReadRecipe = false
  selectedCategory = ['супы', 'салаты', 'выпечка', 'закуски', 'десерты', 'десерты без сахара', 'горячее']

  dataRecipe: IRecipe

  recipeFromComponent: IRecipe

  generalRecipe: Object

  isShareRecipe = false

  fileName: string

  isUpdateRecipe = false

  constructor(private userService: UserService,
              public recipeService: RecipeService,
              private messageService: MessageService,
              private recipeRestService: RecipeRestService) {
  }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      category: new FormControl(),
      title: new FormControl('', {validators: Validators.required}),
      ingredients: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(20)]),
      img: new FormControl('', {validators: Validators.required}),
      userId: new FormControl(this.userService.getUser().id),
    })
  }


  ngOnDestroy() {
  }

  addRecipe() {
    const recipeDataRow = this.recipeForm.getRawValue()
    let formParams = new FormData()
    console.log('form params', recipeDataRow)
    if (typeof recipeDataRow === 'object') {
      for (let prop in recipeDataRow) {
        formParams.append(prop, recipeDataRow[prop])
      }
    }
    this.recipeRestService.saveRecipe(formParams).subscribe((data) => {
    })
    this.messageService.add({severity: 'success', summary: "Вы добавили рецепт в кулинарную книгу!"})
    this.recipeForm.reset()
  }

  onSubmit() {

  }

  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0]
      console.log('file', file)
      this.fileName = file.name
      this.recipeForm.patchValue({
        img: file
      })

    }
  }

  showRecipes() {
    this.recipes = []

    this.recipeRestService.getRecipes().subscribe((data) => {
      console.log('data users', data)
      const userId = this.userService.getUser().id
      data.forEach((el) => {
        if (el.userId === userId) {
          // @ts-ignore
          this.recipes.push(el)
        }
        console.log(this.recipes, 'this.recipes', userId, el.userId)
      })
    })


    this.isShowRecipes = !this.isShowRecipes
    this.isShowAddRecipes = false
  }

  showAddRecipes() {
    this.isShowAddRecipes = !this.isShowAddRecipes
    this.isShowRecipes = false
  }

  shareRecipe(recipe: IRecipe) {


    this.recipeFromComponent = recipe
    const recipeId = recipe._id

    this.recipeRestService.getRecipeById(recipeId).subscribe((item) => {
      console.log('вы хотите поделиться рецептом', item, item.recipeId)

      this.recipeRestService.addGeneralRecipe(item).subscribe((data) => {
      })
    })
    this.messageService.add({severity: 'success', summary: "Вы поделились рецептом!"})
  }

  removeRecipe(recipe: IRecipe) {

    const recipeId = recipe._id

    this.recipeRestService.deleteRecipeById(recipeId).subscribe((data: IRecipe) => {
      console.log('data', data)
    })

    this.recipes = this.recipes.filter((el) => el._id !== recipeId)

  }

  updateRecipe(recipe: IRecipe) {
    this.recipeService.updateRecipe(recipe)

  }

  readRecipe(recipe: IRecipe) {

    this.recipeService.setShowModal(true)
    this.recipeService.getShowModal()
    this.recipeService.setRecipe(recipe)

    this.recipeService.setDescription(true)
  }
}
