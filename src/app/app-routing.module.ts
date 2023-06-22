import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from "./pages/auth/authorization/authorization.component";
import {RegistrationComponent} from "./pages/auth/registration/registration.component";
import {UserComponent} from "./pages/user/user.component";

const routes: Routes = [
  {
    path: 'culinary',
    loadChildren: () => import('./pages/culinary/culinary.module').then(m => m.CulinaryModule)
  },

  {
    path: 'authorization',
    component: AuthorizationComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  // {
  //   path: 'user/:id',
  //   component: UserComponent
  // },
  {
    path: '**',
    redirectTo: 'culinary'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
