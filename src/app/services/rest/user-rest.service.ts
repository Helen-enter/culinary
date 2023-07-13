import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../models/user";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: string | undefined) {
    return this.http.get<IUser>(`http://localhost:3000/users/${id}`)
  }

  addUser(body: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users/', body)
  }

  updateUser(userId: string | undefined, data: IUser) {
    return this.http.put<IUser>(`http://localhost:3000/users/${userId}`, data, {headers: {}})
  }
}
