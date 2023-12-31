import {Injectable} from '@angular/core';
import {IUser} from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string


  constructor() {
  }

  getUser() {
    return this.user
  };


  setUser(user: IUser) {
    // let key = window.localStorage.getItem('user_' + user.login)
    // if (key) {
    //   this.user = JSON.parse(key)
    //   console.log(key)
    // }
    this.user = user
    // записывается пользователь в this.user
  };

  setToken(token: string): void {
    this.token = token
  }

  getToken(): string | null {
    return this.token || window.localStorage.getItem('token')
  }

  setToStore(token: string) {
    window.localStorage.setItem("token", token);
  }
}
