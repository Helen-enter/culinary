import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {IRecipe} from "../../../models/recipe";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRestService} from "../../../services/rest/user-rest.service";

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
  selectedCategory = ['супы', 'салаты', 'выпечка', 'закуски', 'дессерты', 'дессерты без сахара']

  constructor(private http: HttpClient,
              private userService: UserService,
              private userRestService: UserRestService) {
  }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      category: new FormControl(),
      title: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      img: new FormControl(),
      userId: new FormControl(this.userService.getUser().id)
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
    // @ts-ignore
    this.userRestService.createRecipe(formParams).subscribe((data) => {
      console.log('data recipe', data)
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
      this.recipeForm.patchValue({
        img: file
      })

    }
  }

  showRecipes() {
    this.recipes = []
    // @ts-ignore
    this.http.get('http://localhost:3000/recipes').subscribe((data: IRecipe[]) => {
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
}
