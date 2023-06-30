import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {IRecipe} from "../../../models/recipe";
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-book-recipes',
  templateUrl: './book-recipes.component.html',
  styleUrls: ['./book-recipes.component.scss']
})
export class BookRecipesComponent implements OnInit, OnDestroy {
  recipes: [] | any[] = []
  category: string
  description: string
  title: string
  img?: string

  recipeForm: FormGroup

  isShowRecipes = false
  isShowAddRecipes = false
  isReadRecipe = false
  selectedCategory = ['супы', 'салаты', 'выпечка', 'закуски', 'десерты', 'десерты без сахара']

  dataRecipe: IRecipe

  recipeFromComponent: IRecipe

  generalRecipe: Object

  isShareRecipe = false

  fileName: string

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      category: new FormControl(),
      title: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
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

    this.http.post<IRecipe>('http://localhost:3000/recipes/', formParams, {headers: {}}).subscribe((data) => {
    })
  }

  onSubmit() {

  }

  clickShowRecipes() {
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
    this.http.get<IRecipe[]>('http://localhost:3000/recipes').subscribe((data) => {
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
    // const recipeObj: IRecipe = {
    //   title: recipe.title,
    //   description: recipe.description,
    //   category: recipe.category,
    //   recipeId: recipe._id,
    //   userId: recipe.userId,
    //   img: recipe.img,
    //   _id: recipe._id
    // }
    // this.http.put<IRecipe>(`http://localhost:3000/recipes/${recipeId}`, recipeObj).subscribe((data) => {
    //
    // })

    this.http.get<IRecipe>(`http://localhost:3000/recipes/${recipeId}`, {headers: {}}).subscribe((item) => {
      console.log('вы хотите поделиться рецептом', item, item.recipeId)

      this.http.post<IRecipe>(`http://localhost:3000/general-recipes/`, item).subscribe((data) => {
      })
    })
  }

  removeRecipe(recipeId: string) {

    this.http.delete<IRecipe>(`http://localhost:3000/recipes/${recipeId}`).subscribe((data: IRecipe) => {
      console.log('data', data)
    })

    this.recipes = this.recipes.filter((el) => el._id !== recipeId)

  }

  updateRecipe(recipe: IRecipe) {
    console.log('вы хотите изменить рецепт:', recipe)
  }
}
