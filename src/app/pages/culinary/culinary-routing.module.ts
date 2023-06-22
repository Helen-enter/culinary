import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CulinaryComponent} from "./culinary.component";
import {UserComponent} from "../user/user.component";

const routes: Routes = [
  {
    path: '', component: CulinaryComponent,
    // children: [
    //   {
    //     path: 'user/:id',
    //     component: UserComponent,
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulinaryRoutingModule {
}
