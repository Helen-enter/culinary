import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {IRecipe} from "../../../models/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Router} from "@angular/router";
import {RecipeRestService} from "../../../services/rest/recipe-rest.service";

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
              private recipeRestService: RecipeRestService,
              private router: Router) {
  }

  ngOnInit() {


    this.login = this.userService.getUser().login
    this.id = this.userService.getUser().id


  }

  initSearchRecipes() {

    if (this.searchValue) {
      this.recipeService.setShowImg(false)
      this.recipeService.getShowImg()
      this.http.get<IRecipe[]>('http://localhost:3000/general-recipes/' + this.searchValue).subscribe((data) => {
        this.generalRecipes = data
        this.recipeService.updateCulinary(data)
      })

    } else {
      this.recipeService.setShowImg(true)
      this.recipeService.getShowImg()
      this.recipeRestService.getGeneralRecipes().subscribe((data) => {
        this.recipeService.updateCulinary(data)
      })
    }
  }

  clickLogo() {
    const userId = this.userService.getUser().id
    this.router.navigate([`user/${userId}`])
  }
}
