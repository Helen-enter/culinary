import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../models/user";
import {IRecipe} from "../../models/recipe";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) {
  }

  createRecipe(body: IRecipe): Observable<any> {
    return this.http.post('http://localhost:3000/recipes/', body, {headers: {}})
  }

  getUsers() {
    return this.http.get<IUser[]>('http://localhost:3000/users/')
  }

  getUserById(id: string) {
    return this.http.get<IUser>(`http://localhost:3000/users/${id}`)
  }
}
