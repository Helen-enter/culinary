import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CulinaryComponent} from "./culinary.component";

const routes: Routes = [
  { path: '', component: CulinaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulinaryRoutingModule { }
