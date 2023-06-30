import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import {IUser} from 'src/app/models/user';
import {UserService} from 'src/app/services/user/user.service';
import {UserRestService} from "../../../services/rest/user-rest.service";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  psw: string
  login: string
  selectedValue: boolean
  authTextButton: string

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private userRestService: UserRestService) {

  }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться'
  }

  ngOnDestroy(): void {
    console.log('destroy')
  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
    }


    this.http.post<{ access_token: string, id: string }>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {
      console.log('token', data.access_token)
      console.log(data, 'data user')
      authUser.id = data.id
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);


      const userId = this.userService.getUser().id
      console.log("userId", userId)
      //this.router.navigate([`user/${userId}`]);
      this.router.navigate([`user/${userId}`]);


    }, (err: HttpErrorResponse) => {
      // const serverError = err.error
      // this.messageService.add({severity: 'warn', summary: serverError.errorText});
      this.messageService.add({severity: 'warn', summary: "Ошибка"});
    });

  }

}
