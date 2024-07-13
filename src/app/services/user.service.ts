import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    const email = sessionStorage.getItem('user');
    return this.http.get<User>(environment.gateway + 'users' + '/' + email);
  }

  public getEmail(): string | null {
    return sessionStorage.getItem('user');
  }
}
