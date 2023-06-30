import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user.component";


const routes: Routes = [
  {
    path: '', component: UserComponent,
    // children: [
    //   {
    //     path: 'user/:id',
    //     loadChildren: () => import('../user/user.module').then(m => m.UserModule)
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
