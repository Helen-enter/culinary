import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from "./user.component";
import {HttpClientModule} from "@angular/common/http";
import {TabViewModule} from "primeng/tabview";
import { CaloriesComponent } from './calories/calories.component';
import { BookRecipesComponent } from './book-recipes/book-recipes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    UserComponent,
    CaloriesComponent,
    BookRecipesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    InputTextareaModule,
    MultiSelectModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule {
}
