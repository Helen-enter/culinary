import {Component, OnInit} from '@angular/core';
import { IUser } from 'src/app/models/user';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  login: string
  psw: string
  pswRepeat: string
  email: string
  saveUserInStore: boolean = false

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  registration(ev: Event): boolean | void {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Password mismatch'});
      return false
    }

    const userObj: IUser = {
      login: this.login,
      psw: this.psw,
      email: this.email,
    }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_' + userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});

    }, (err: HttpErrorResponse) => {
      console.log('err', err)
      const serverError = err.error
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });
  }


}
