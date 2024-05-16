import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../models/userAuth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('status')?.match('loggedIn')) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.clear();
  }

  saveUserInfo() {
    localStorage.setItem('status', 'loggedIn');
  }

  register(userAuth: UserAuth): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'users/register',
      userAuth
    );
  }

  validate(userAuth: UserAuth): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'users/validate',
      userAuth
    );
  }
}
