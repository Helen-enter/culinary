import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
  selector: 'app-culinary-modal',
  templateUrl: './culinary-modal.component.html',
  styleUrls: ['./culinary-modal.component.scss']
})
export class CulinaryModalComponent implements OnInit {

  @Input() title: string

  constructor(private http: HttpClient,
              public recipeService: RecipeService) {
  }

  ngOnInit() {
  }


}
