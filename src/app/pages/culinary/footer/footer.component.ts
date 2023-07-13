import { Component } from '@angular/core';
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public recipeService: RecipeService) {
  }

}
