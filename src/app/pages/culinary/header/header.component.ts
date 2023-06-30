import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {IRecipe} from "../../../models/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login: string
  id: string | undefined

  generalRecipes: IRecipe[] | []

  searchValue: string

  constructor(private userService: UserService,
              private http: HttpClient,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {


    this.login = this.userService.getUser().login
    this.id = this.userService.getUser().id


  }

  initSearchRecipes() {

    if (this.searchValue) {

      this.http.get<IRecipe[]>('http://localhost:3000/general-recipes/' + this.searchValue).subscribe((data) => {
        this.generalRecipes = data
        this.recipeService.updateCulinary(data)

        console.log('nameRecipe', this.searchValue)
        console.log('nameRecipe', data)

      })

    } else {
      this.http.get<IRecipe[]>('http://localhost:3000/general-recipes/').subscribe((data) => {
        this.recipeService.updateCulinary(data)
        console.log(data, 'general-recipes')

      })
    }
  }

  clickLogo() {
    const userId = this.userService.getUser().id
    console.log('ussssssssssss', userId)
    this.router.navigate([`user/${userId}`])
  }
}
