import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {RecipeService} from "../../services/recipe/recipe.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userName: string

  dataUser: IUser

  constructor(private userService: UserService,
              public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.userName = this.userService.getUser().login


    //params

    // const hasId = this.route.snapshot.paramMap.has('id')
    // const routeIdParam = this.route.snapshot.paramMap.get(`id`)
    // console.log(routeIdParam, hasId, 'paramValueId')

    // this.userName = this.userService.getUser().login

    // if (routeIdParam !== 'undefined') {
    //
    //   console.log(routeIdParam, hasId, 'bjhrggggggggg')
    //   this.http.get<IUser>(`http://localhost:3000/users/${routeIdParam}`).subscribe((data) => {
    //     if(data) {
    //       const user: IUser = {
    //         psw: data.psw,
    //         login: data.login,
    //         //@ts-ignore
    //         id: routeIdParam
    //       }
    //       console.log(data, 'useeeeeeeeeer')
    //       this.dataUser = user
    //       this.userService.setUser(this.dataUser)
    //       this.userName = this.userService.getUser().login
    //     }
    //   })
    // } else {
    //   this.userName = this.userService.getUser().login
    //   console.log('this.userName', this.userName)
    // }


  }

  goOut() {
    this.userService.setUser({
      id: '',
      psw: '',
      login: ''
    })

    this.userService.getUser()
  }
}

