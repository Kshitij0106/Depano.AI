import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../models/userAuth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { SignUpUser } from '../models/signUpUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    if (
      localStorage.getItem('status')?.match('loggedIn') &&
      localStorage.getItem('user') !== ''
    ) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.clear();
  }

  saveUserInfo(email: string) {
    localStorage.setItem('status', 'loggedIn');
    localStorage.setItem('user', email);
  }

  login(userAuth: UserAuth): Observable<Auth> {
    return this.http.post<Auth>(environment.gateway + 'auth/login', userAuth);
  }

  signUp(signUpUser: SignUpUser): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/signup',
      signUpUser
    );
  }

  register(signUpUser: SignUpUser): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/register',
      signUpUser
    );
  }

  forgotPasswordRequest(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'users/forgotPasswordRequest',
      user
    );
  }

  forgotPasswordRequestVerification(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'users/forgotPassword/otp',
      user
    );
  }

  changePassword(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'users/resetPassword',
      user
    );
  }
}
