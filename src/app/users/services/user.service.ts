import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private action: string;
  private url: string;
  constructor(private http: HttpClient) {
    this.action = 'register';
    this.url = 'https://rocky-waters-38120.herokuapp.com/api/';
  }

  register(user: UserDTO): Observable<UserDTO> {
    this.action = 'register';
    return this.http.post<UserDTO>(this.url+this.action, user);
  }

  login(user:UserDTO): Observable<UserDTO>{
    this.action = 'login';
    return this.http.post<UserDTO>(this.url+this.action, user);
  }
}
