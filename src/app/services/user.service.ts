import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  mobileNumber: string;
  email: string;
  userName: string;
  credits: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userDetails = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * A getter that retrieves the user id form session storage.
   * @returns {Observable<User>} - An observable containing the user information.
   */
  public getMyUserDetails(): Observable<User> {
    return this.http.get<User>(environment.gateway + 'users' + '/me');
  }

  public saveUserInfo(user: User) {
    localStorage.setItem('user', user.userName);
    this.userDetails.next(user);
  }

  public getUserName(): string {
    return localStorage.getItem('user') || '';
  }

  public clearUserDetails() {
    this.userDetails.next(null);
  }

  /**
   * Update credits after successfull generation of image.
   */
  public updateUserDetails() {
    this.getMyUserDetails().subscribe((user) => {
      localStorage.setItem('user', user.userName);
      this.userDetails.next(user);
    });
  }
}
